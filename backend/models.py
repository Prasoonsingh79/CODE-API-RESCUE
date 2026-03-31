from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional, Annotated, List
from datetime import datetime

# Represents a MongoDB ObjectId as a string in Pydantic models
PyObjectId = Annotated[str, BeforeValidator(str)]

class FileContent(BaseModel):
    filename: str
    content: str

class ProjectModel(BaseModel):
    """Schema for a project document"""
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(..., description="Name of the project")
    description: str = Field(..., description="Short description or summary")
    code: Optional[str] = Field(default=None, description="Legacy single-file code content")
    files: List[FileContent] = Field(default_factory=list, description="Uploaded source files")
    stars: int = Field(default=0, description="Number of stars received")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Timestamp of creation")

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "name": "Bubble Sort Implementation",
                "description": "A simple bubble sort in Python",
                "files": [
                    {"filename": "main.py", "content": "print('hello world')"}
                ],
                "stars": 0
            }
        }
