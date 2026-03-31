import motor.motor_asyncio
import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# Connect to MongoDB
MONGO_DETAILS = os.getenv("MONGO_URL")

# Connect specifically to your real database instance on MongoDB Atlas
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

# Create/Use database called coderescue
database = client.coderescue

# Collection for projects
project_collection = database.get_collection("projects")
