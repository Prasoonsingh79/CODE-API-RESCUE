from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional, Annotated
from datetime import datetime

# Represents a MongoDB ObjectId as a string in Pydantic models
PyObjectId = Annotated[str, BeforeValidator(str)]

class ProjectModel(BaseModel):
    """Schema for a project document"""
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(..., description="Name of the project")
    description: str = Field(..., description="Short description or summary")
    code: str = Field(..., description="The actual source code snippet")
    stars: int = Field(default=0, description="Number of stars received")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Timestamp of creation")

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "name": "Bubble Sort Implementation",
                "description": "A simple bubble sort in Python",
                "code": "def sort(arr): pass",
                "stars": 0
            }
        }
