"""Authentication Pydantic schemas."""

from typing import Optional

from pydantic import BaseModel, EmailStr


class UserProfile(BaseModel):
    """User profile response schema."""
    id: str
    email: EmailStr
    full_name: str
    avatar_url: Optional[str] = None
    role_name: Optional[str] = None


class LoginRequest(BaseModel):
    """Login request payload schema."""
    email: EmailStr
    password: str


class SignupRequest(BaseModel):
    """User registration payload schema."""
    email: EmailStr
    password: str
    full_name: str


class TenantCreateRequest(BaseModel):
    """Tenant creation request schema."""
    company_name: str
    industry: str
    team_size: str


class TokenResponse(BaseModel):
    """OAuth token response schema."""
    access_token: str
    token_type: str = "bearer"
    user: UserProfile
