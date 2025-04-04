from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from bson import ObjectId

class PyObjectId(ObjectId):
    """Permite manejar ObjectId en Pydantic."""
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

class Donor(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str
    email: EmailStr
    amount: float

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class Volunteer(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str
    phone: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
