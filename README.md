# CodeRescue Platform

CodeRescue is a premium platform where users can create, upload, and manage coding projects. It comes with basic code analysis and suggestions to improve code quality. Built with an elegant Vanilla CSS Premium UI.

## Tech Stack
- **Frontend**: React (Vite) with Lucide Icons and Premium Vanilla CSS
- **Backend**: Python 3 (FastAPI) + Motor (Async MongoDB Driver)
- **Database**: MongoDB

## Setup Instructions

### Prerequisites
1. Open PowerShell or Command Prompt.
2. Ensure you have Node.js installed (v18+).
3. Ensure you have Python installed (v3.9+).
4. Ensure you have a MongoDB instance running locally on `mongodb://localhost:27017` (You can download MongoDB Community Edition if you don't have it).

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd "backend"
   ```
2. Create and activate a Virtual Environment (optional but recommended):
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server (Runs on port 8000):
   ```bash
   uvicorn main:app --reload
   ```
   *Your backend is now running at http://localhost:8000*
   *You can visit the API docs at http://localhost:8000/docs*

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd "frontend"
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server (Runs on port 5173):
   ```bash
   npm run dev
   ```
   *Your frontend is now running at http://localhost:5173*

## Application Highlights
- **Premium User Interface**: Implemented smooth glassmorphism, dynamic glowing backgrounds, and beautiful modern typography (Inter font). No placeholders!
- **AI Analysis Mechanism**: Code that is published is automatically parsed on the detail page to provide qualitative feedback (mocked/static logic handling code attributes).
- **Project Structure**: Clear division of concerns.
- **RESTful API**: Fast and robust interactions with the backend, with validation handled by Pydantic schemas.
