
# 1. Clone/download the project
cd HRMSs-LITE

# 1. Clone/download the project
cd hrms-lite

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Navigate to backend directory
cd backend

# Setup database
python manage.py migrate

# Run server
python manage.py runserver
```

Backend is now running at `http://localhost:8000`

#### Step 2: Frontend Setup

# Open a new terminal
cd frontend

#Run this command
python -m http.server 3000

Frontend is now running at `http://localhost:3000`
