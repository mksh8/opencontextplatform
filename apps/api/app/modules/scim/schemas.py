from pydantic import BaseModel, Field
from typing import List, Optional, Any

class SCIMName(BaseModel):
    familyName: Optional[str] = None
    givenName: Optional[str] = None

class SCIMEmail(BaseModel):
    value: str
    type: Optional[str] = "work"
    primary: Optional[bool] = True

class SCIMUserCreate(BaseModel):
    schemas: List[str] = ["urn:ietf:params:scim:schemas:core:2.0:User"]
    userName: str
    name: Optional[SCIMName] = None
    emails: List[SCIMEmail]
    active: Optional[bool] = True

class SCIMUserResponse(SCIMUserCreate):
    id: str
    meta: dict
