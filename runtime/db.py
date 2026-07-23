"""Database connection session management and SQLAlchemy base."""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Standard Postgres connection
DATABASE_URL = os.getenv(
    "POSTGRES_URL",
    "postgresql://postgres:opencontext@localhost:5432/opencontext"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db_session():
    """Yield a database session context manager for requests."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
