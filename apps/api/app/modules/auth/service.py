import uuid
import bcrypt
from jose import jwt
from datetime import datetime, timedelta
from apps.api.app.modules.auth.schemas import (
    UserProfile, 
    LoginRequest, 
    SignupRequest, 
    TenantCreateRequest, 
    TokenResponse
)
from sqlalchemy.orm import Session
from runtime.models import User, Tenant, Organization

SECRET_KEY = "super_secret_opencontext_key_for_jwt" # In production, load from env
ALGORITHM = "HS256"

class AuthService:
    def get_current_user(self) -> UserProfile:
        """Returns mock authenticated user profile."""
        return UserProfile(
            id="usr_admin_999",
            email="admin@opencontext.com",
            full_name="Admin User",
            avatar_url="https://ui-avatars.com/api/?name=Admin+User&background=random",
        )

    def _create_access_token(self, data: dict, expires_delta: timedelta = timedelta(minutes=1440)):
        to_encode = data.copy()
        expire = datetime.utcnow() + expires_delta
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    def login(self, request: LoginRequest, db: Session) -> TokenResponse:
        """Checks credentials against PostgreSQL and returns a JWT token."""
        user_record = db.query(User).filter(User.email == request.email).first()
        if not user_record:
            raise ValueError("Invalid credentials")
            
        stored_hash = user_record.password_hash
        # Handle returned strings which might not be bytes
        if isinstance(stored_hash, str):
            stored_hash = stored_hash.encode("utf-8")
            
        try:
            if not bcrypt.checkpw(request.password[:72].encode("utf-8"), stored_hash):
                raise ValueError("Invalid credentials")
        except ValueError:
            raise ValueError("Invalid credentials")

        token = self._create_access_token(data={"sub": user_record.email, "id": str(user_record.id)})
        
        user_profile = UserProfile(
            id=str(user_record.id),
            email=user_record.email,
            full_name=user_record.full_name or "User",
            avatar_url=f"https://ui-avatars.com/api/?name={(user_record.full_name or 'User').replace(' ', '+')}&background=random"
        )
        return TokenResponse(access_token=token, user=user_profile)

    def signup(self, request: SignupRequest, db: Session) -> TokenResponse:
        """Creates a new user in PostgreSQL and returns a JWT token."""
        # Check if user exists
        existing = db.query(User).filter(User.email == request.email).first()
        if existing:
            raise ValueError("Email already registered")
            
        org_id = uuid.uuid4()
        tenant_id = uuid.uuid4()
        user_id = uuid.uuid4()
        
        # Create default organization for the user
        org = Organization(
            id=org_id,
            code=f"org_{org_id.hex[:8]}",
            name=f"{request.full_name}'s Org"
        )
        db.add(org)
        
        # Create default tenant
        tenant = Tenant(
            id=tenant_id,
            organization_id=org_id,
            code=f"tenant_{tenant_id.hex[:8]}",
            name="Default Tenant"
        )
        db.add(tenant)
        
        hashed_password = bcrypt.hashpw(request.password[:72].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        
        new_user = User(
            id=user_id,
            tenant_id=tenant_id,
            email=request.email,
            password_hash=hashed_password,
            full_name=request.full_name
        )
        db.add(new_user)
        db.commit()
        
        token = self._create_access_token(data={"sub": request.email, "id": str(user_id)})
        
        user_profile = UserProfile(
            id=str(user_id),
            email=request.email,
            full_name=request.full_name,
            avatar_url=f"https://ui-avatars.com/api/?name={request.full_name.replace(' ', '+')}&background=random"
        )
        return TokenResponse(access_token=token, user=user_profile)

    def onboard_tenant(self, request: TenantCreateRequest, db: Session) -> dict:
        """Provisions a new organization and tenant in PostgreSQL."""
        org_id = uuid.uuid4()
        tenant_id = uuid.uuid4()
        
        org = Organization(
            id=org_id,
            code=f"org_{org_id.hex[:8]}",
            name=request.company_name,
            industry=request.industry
        )
        db.add(org)
        
        new_tenant = Tenant(
            id=tenant_id,
            organization_id=org_id,
            code=f"tenant_{tenant_id.hex[:8]}",
            name=request.company_name,
            metadata_json={"team_size": request.team_size}
        )
        db.add(new_tenant)
        db.commit()
        
        return {
            "status": "success",
            "tenant_id": str(tenant_id),
            "company_name": request.company_name
        }

auth_service = AuthService()
