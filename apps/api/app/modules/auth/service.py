import secrets
from apps.api.app.modules.auth.schemas import (
    UserProfile, 
    LoginRequest, 
    SignupRequest, 
    TenantCreateRequest, 
    TokenResponse
)

class AuthService:
    def get_current_user(self) -> UserProfile:
        """Returns mock authenticated user profile."""
        return UserProfile(
            id="usr_admin_999",
            email="admin@opencontext.com",
            full_name="Admin User",
            avatar_url="https://ui-avatars.com/api/?name=Admin+User&background=random",
        )

    def login(self, request: LoginRequest) -> TokenResponse:
        """Simulates checking credentials and returning a token."""
        # Mock behavior: Accept any valid payload
        token = secrets.token_hex(16)
        user = UserProfile(
            id="usr_login_123",
            email=request.email,
            full_name="Existing User",
            avatar_url=f"https://ui-avatars.com/api/?name=Existing+User&background=random"
        )
        return TokenResponse(access_token=token, user=user)

    def signup(self, request: SignupRequest) -> TokenResponse:
        """Simulates creating a new user and returning a token."""
        token = secrets.token_hex(16)
        user = UserProfile(
            id="usr_new_456",
            email=request.email,
            full_name=request.full_name,
            avatar_url=f"https://ui-avatars.com/api/?name={request.full_name.replace(' ', '+')}&background=random"
        )
        return TokenResponse(access_token=token, user=user)

    def onboard_tenant(self, request: TenantCreateRequest) -> dict:
        """Simulates provisioning a new tenant."""
        return {
            "status": "success",
            "tenant_id": f"tenant_{secrets.token_hex(8)}",
            "company_name": request.company_name
        }

auth_service = AuthService()
