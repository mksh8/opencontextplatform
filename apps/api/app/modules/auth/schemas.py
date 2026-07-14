from pydantic import BaseModel


class UserProfile(BaseModel):
    id: str
    email: str
    full_name: str
    avatar_url: str


class AuthToken(BaseModel):
    access_token: str
    token_type: str = "bearer"
