import motor.motor_asyncio
import os

# Connect to MongoDB
# Defaults to localhost for lower friction setup
MONGO_DETAILS = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

# Create/Use database called coderescue
database = client.coderescue

# Collection for projects
project_collection = database.get_collection("projects")
