#!/bin/bash

echo "Starting Notes App setup..."

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "Python is not installed! Please install Python 3.11 or higher."
    exit 1
fi

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed! Please install Node.js 18 or higher."
    exit 1
fi

# Create and activate virtual environment
echo "Creating Python virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
cd frontend
npm install

# Return to root directory
cd ..

# Setup database
echo "Setting up database..."
cd backend
python manage.py makemigrations
python manage.py migrate

# Start backend server
echo "Starting backend server..."
python manage.py runserver &

# Start frontend server
echo "Starting frontend server..."
cd ../frontend
npm run dev &

echo "Setup complete! The application should be running at:"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:8000/api"
