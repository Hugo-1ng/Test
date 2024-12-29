@echo off
echo Starting Notes App setup...

REM Check Python installation
python --version > nul 2>&1
if errorlevel 1 (
    echo Python is not installed! Please install Python 3.11 or higher.
    exit /b 1
)

REM Check Node.js installation
node --version > nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed! Please install Node.js 18 or higher.
    exit /b 1
)

REM Create and activate virtual environment
echo Creating Python virtual environment...
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Install Node.js dependencies
echo Installing Node.js dependencies...
cd frontend
call npm install

REM Return to root directory
cd ..

REM Setup database
echo Setting up database...
cd backend
python manage.py makemigrations
python manage.py migrate

REM Start backend server
echo Starting backend server...
start cmd /k "cd backend && ..\venv\Scripts\python manage.py runserver"

REM Start frontend server
echo Starting frontend server...
start cmd /k "cd frontend && npm run dev"

echo Setup complete! The application should be running at:
echo Frontend: http://localhost:5173
echo Backend: http://localhost:8000/api
