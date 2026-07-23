import uuid
from sqlalchemy import Column, String, Text, ForeignKey, Integer, Boolean, Numeric, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from runtime.models.base import Base

class EmbeddingModel(Base):
    __tablename__ = "embedding_models"
    __table_args__ = {"schema": "ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    provider_config_id = Column(UUID(as_uuid=True), ForeignKey("provider.provider_configs.id", ondelete="CASCADE"), nullable=False)
    model_name = Column(String(255), nullable=False)
    dimensions = Column(Integer, nullable=False)
    max_tokens = Column(Integer)
    supports_batch = Column(Boolean, default=True)
    status = Column(String(30), default="ACTIVE")
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ChatModel(Base):
    __tablename__ = "chat_models"
    __table_args__ = {"schema": "ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    provider_config_id = Column(UUID(as_uuid=True), ForeignKey("provider.provider_configs.id", ondelete="CASCADE"), nullable=False)
    model_name = Column(String(255), nullable=False)
    context_window = Column(Integer)
    max_output_tokens = Column(Integer)
    supports_streaming = Column(Boolean, default=True)
    supports_tools = Column(Boolean, default=False)
    supports_vision = Column(Boolean, default=False)
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class RerankerModel(Base):
    __tablename__ = "reranker_models"
    __table_args__ = {"schema": "ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    provider_config_id = Column(UUID(as_uuid=True), ForeignKey("provider.provider_configs.id", ondelete="CASCADE"), nullable=False)
    model_name = Column(String(255), nullable=False)
    max_documents = Column(Integer)
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ModelPricing(Base):
    __tablename__ = "model_pricing"
    __table_args__ = {"schema": "ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    chat_model_id = Column(UUID(as_uuid=True), ForeignKey("ai.chat_models.id"))
    embedding_model_id = Column(UUID(as_uuid=True), ForeignKey("ai.embedding_models.id"))
    input_cost = Column(Numeric(12, 6))
    output_cost = Column(Numeric(12, 6))
    currency = Column(String(10), default="USD")
    effective_from = Column(DateTime(timezone=True), server_default=func.now())


class PromptTemplate(Base):
    __tablename__ = "prompt_templates"
    __table_args__ = {"schema": "ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    category = Column(String(100))
    latest_version = Column(Integer, default=1)
    created_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class PromptVersion(Base):
    __tablename__ = "prompt_versions"
    __table_args__ = {"schema": "ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    template_id = Column(UUID(as_uuid=True), ForeignKey("ai.prompt_templates.id", ondelete="CASCADE"), nullable=False)
    version = Column(Integer, nullable=False)
    system_prompt = Column(Text)
    user_prompt = Column(Text)
    configuration = Column(JSONB, default=dict)
    created_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class PromptVariable(Base):
    __tablename__ = "prompt_variables"
    __table_args__ = {"schema": "ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    prompt_version_id = Column(UUID(as_uuid=True), ForeignKey("ai.prompt_versions.id", ondelete="CASCADE"), nullable=False)
    variable_name = Column(String(255), nullable=False)
    data_type = Column(String(50))
    default_value = Column(Text)
    required = Column(Boolean, default=False)


class PromptExecution(Base):
    __tablename__ = "prompt_executions"
    __table_args__ = {"schema": "ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    prompt_version_id = Column(UUID(as_uuid=True), ForeignKey("ai.prompt_versions.id"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    provider_config_id = Column(UUID(as_uuid=True), ForeignKey("provider.provider_configs.id"))
    model_name = Column(String(255))
    input_tokens = Column(Integer)
    output_tokens = Column(Integer)
    latency_ms = Column(Integer)
    status = Column(String(30))
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
