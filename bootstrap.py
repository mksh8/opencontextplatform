"""Interactive setup wizard script for bootstrapping OpenContextPlatform."""

import getpass
import os
import sys
import uuid

import bcrypt
from sqlalchemy.orm import Session

# Add current directory to path so we can import from runtime and apps
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from runtime.db import engine  # pylint: disable=wrong-import-position
from runtime.models.identity import Role, RoleAssignment, User  # pylint: disable=wrong-import-position


def bootstrap():
    """Run interactive setup wizard to create initial Platform Owner user."""
    print("=" * 50)
    print("OpenContextPlatform Setup Wizard")
    print("=" * 50)

    with Session(engine) as session:
        # Check if platform is already initialized
        platform_owner_role = session.query(Role).filter_by(name="Platform Owner").first()
        if platform_owner_role:
            existing_owner = session.query(RoleAssignment).filter_by(
                role_id=platform_owner_role.id,
                scope_type="PLATFORM"
            ).first()
            if existing_owner:
                print("\nError: Platform is already initialized. A Platform Owner exists.")
                sys.exit(1)
        else:
            print("\nError: Roles have not been seeded. Please run init_db first.")
            sys.exit(1)

        platform_name = input("\nPlatform Name (e.g. OpenContextPlatform): ").strip()
        if not platform_name:
            platform_name = "OpenContextPlatform"

        platform_url = input("Platform URL (e.g. https://platform.company.com): ").strip()
        if platform_url:
            print(f"Configuring platform URL: {platform_url}")

        admin_name = input("Platform Owner Name: ").strip()
        while not admin_name:
            admin_name = input("Platform Owner Name (Required): ").strip()

        admin_email = input("Email: ").strip()
        while not admin_email:
            admin_email = input("Email (Required): ").strip()

        password = getpass.getpass("Password: ")
        while not password:
            password = getpass.getpass("Password (Required): ")

        confirm_password = getpass.getpass("Confirm Password: ")
        if password != confirm_password:
            print("Passwords do not match!")
            sys.exit(1)

        print("\nCreating Platform Owner...")

        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

        super_admin = User(
            id=uuid.uuid4(),
            email=admin_email,
            password_hash=hashed_password,
            full_name=admin_name,
            status="ACTIVE"
        )
        session.add(super_admin)
        session.flush()

        assignment = RoleAssignment(
            user_id=super_admin.id,
            role_id=platform_owner_role.id,
            scope_type="PLATFORM"
        )
        session.add(assignment)

        session.commit()

        print("\n" + "=" * 50)
        print(f"Success! {platform_name} Platform Owner created.")
        print(f"You may now log in to the Platform Console using: {admin_email}")
        print("=" * 50 + "\n")


if __name__ == "__main__":
    bootstrap()
