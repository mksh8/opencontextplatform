"""SCIM Pydantic schemas adhering to RFC 7643."""

from typing import List, Optional

from pydantic import BaseModel


class SCIMName(BaseModel):
    """SCIM user name component schema."""
    familyName: Optional[str] = None  # pylint: disable=invalid-name
    givenName: Optional[str] = None  # pylint: disable=invalid-name


class SCIMEmail(BaseModel):
    """SCIM user email component schema."""
    value: str
    type: Optional[str] = "work"
    primary: Optional[bool] = True


class SCIMUserCreate(BaseModel):
    """SCIM user provisioning request schema."""
    schemas: List[str] = ["urn:ietf:params:scim:schemas:core:2.0:User"]
    userName: str  # pylint: disable=invalid-name
    name: Optional[SCIMName] = None
    emails: List[SCIMEmail]
    active: Optional[bool] = True


class SCIMUserResponse(SCIMUserCreate):
    """SCIM user provisioning response schema."""
    id: str
    meta: dict
