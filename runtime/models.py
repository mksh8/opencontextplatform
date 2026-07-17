from sqlalchemy import Column, String, Integer, Text, ForeignKey, JSON
from runtime.db import Base

class Tenant(Base):
    __tablename__ = "tenants"
    
    id = Column(String, primary_key=True, index=True)
    company_name = Column(String, index=True)
    industry = Column(String)
    team_size = Column(String)

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String)
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=True)

class ConnectorConfig(Base):
    __tablename__ = "connector_configs"
    
    id = Column(String, primary_key=True, index=True)
    tenant_id = Column(String, ForeignKey("tenants.id"), index=True)
    name = Column(String, nullable=False)
    connector_type = Column(String)
    credentials_json = Column(Text)
