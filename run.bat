@echo off
echo =====================================
echo Checking prerequisites...
echo =====================================

where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Python is required but not installed.
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js/npm is required but not installed.
    exit /b 1
)

echo =====================================
echo Setting up Python virtual environment...
echo =====================================

if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate.bat

echo =====================================
echo Installing Python dependencies...
echo =====================================
pip install -r requirements.txt

echo =====================================
echo Installing Node.js dependencies...
echo =====================================
cd frontend
call npm install
cd ..

echo =====================================
echo Setting up environment variables...
echo =====================================
if not exist backend\.env (
    echo DEBUG=True > backend\.env
    echo SECRET_KEY=your-secret-key-here >> backend\.env
    echo ALLOWED_HOSTS=localhost,127.0.0.1 >> backend\.env
)

echo =====================================
echo Setting up database...
echo =====================================
cd backend
python manage.py makemigrations
python manage.py migrate
cd ..

echo =====================================
echo Starting servers...
echo =====================================
echo Frontend will be available at: http://localhost:5173
echo Backend will be available at: http://localhost:8000
echo Press Ctrl+C to stop all servers

start cmd /k "cd frontend && npm run dev"
start cmd /k "cd backend && python manage.py runserver"
