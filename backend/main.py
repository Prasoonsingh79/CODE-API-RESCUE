from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.projects import router as ProjectRouter

app = FastAPI(
    title="CodeRescue API",
    description="REST API for CodeRescue platform managing code snippets and projects",
    version="1.0.0"
)

# Enable CORS for frontend communication
# Allowed origins set to wildcard for local dev convenience, to be restricted in prod
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(ProjectRouter, tags=["Projects"], prefix="/projects")

@app.get("/", tags=["Root"])
async def read_root():
    return {
        "message": "Welcome to the CodeRescue API!",
        "status": "Healthy"
    }
