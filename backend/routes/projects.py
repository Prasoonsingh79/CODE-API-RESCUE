from fastapi import APIRouter, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
from bson import ObjectId

from models import ProjectModel
from database import project_collection

router = APIRouter()

@router.post("/", response_description="Create a new project", response_model=ProjectModel, status_code=status.HTTP_201_CREATED)
async def create_project(project: ProjectModel = Body(...)):
    """Create a new code project and store it in the database."""
    project_dict = jsonable_encoder(project)
    
    # Remove _id if it's null before inserting so Mongo auto-generates it
    if "_id" in project_dict and project_dict["_id"] is None:
        del project_dict["_id"]
        
    new_project = await project_collection.insert_one(project_dict)
    created_project = await project_collection.find_one({"_id": new_project.inserted_id})
    return created_project

@router.get("/", response_description="List all projects", response_model=List[ProjectModel])
async def list_projects():
    """Retrieve all projects stored in the database."""
    projects = await project_collection.find().to_list(1000)
    return projects

@router.get("/{id}", response_description="Get a single project", response_model=ProjectModel)
async def show_project(id: str):
    """Retrieve details of a single project by its ID."""
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid project ID format")
        
    project = await project_collection.find_one({"_id": ObjectId(id)})
    if project is not None:
        return project
        
    raise HTTPException(status_code=404, detail=f"Project with ID {id} not found")

@router.post("/{id}/star", response_description="Star a project", response_model=ProjectModel)
async def star_project(id: str):
    """Increment the star count of a project by 1."""
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid project ID format")
        
    # Find and update in a single atomic operation
    updated_project = await project_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$inc": {"stars": 1}},
        return_document=True
    )
    
    if updated_project:
        return updated_project
        
    raise HTTPException(status_code=404, detail=f"Project with ID {id} not found")
