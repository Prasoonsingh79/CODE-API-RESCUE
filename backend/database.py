import motor.motor_asyncio
import os

# Connect to MongoDB
MONGO_DETAILS = os.getenv("MONGO_URL", "mongodb://localhost:27017")

try:
    # Safely mock MongoDB purely in memory if a physical instance is missing!
    from mongomock_motor import AsyncMongoMockClient
    client = AsyncMongoMockClient()
    print("WARNING: Real MongoDB server not detected. Using AsyncMongoMockClient (In-Memory).")
except ImportError:
    client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

# Create/Use database called coderescue
database = client.coderescue

# Collection for projects
project_collection = database.get_collection("projects")
