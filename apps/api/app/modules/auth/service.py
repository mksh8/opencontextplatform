from apps.api.app.modules.auth.schemas import UserProfile


class AuthService:
    def get_current_user(self) -> UserProfile:
        """Returns mock authenticated user profile."""
        return UserProfile(
            id="usr_admin_999",
            email="admin@opencontext.com",
            full_name="Admin User",
            avatar_url="https://ui-avatars.com/api/?name=Admin+User&background=random",
        )


auth_service = AuthService()
