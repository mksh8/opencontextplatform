import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# The Postgres plugin runs on port 5432, we use standard Postgres URL
# Standard Postgres connection
DATABASE_URL = os.getenv("POSTGRES_URL", "postgresql://postgres:opencontext@localhost:5432/opencontext")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
