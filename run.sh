#!/bin/bash

echo "====================================="
echo "Checking prerequisites..."
echo "====================================="

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "Error: Python3 is required but not installed."
    exit 1
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "Error: Node.js/npm is required but not installed."
    exit 1
fi

echo "====================================="
echo "Setting up Python virtual environment..."
echo "====================================="

# Create and activate virtual environment
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

echo "====================================="
echo "Installing Python dependencies..."
echo "====================================="
pip install -r requirements.txt

echo "====================================="
echo "Installing Node.js dependencies..."
echo "====================================="
cd frontend
npm install
cd ..

echo "====================================="
echo "Setting up environment variables..."
echo "====================================="
if [ ! -f "backend/.env" ]; then
    echo "DEBUG=True" > backend/.env
    echo "SECRET_KEY=your-secret-key-here" >> backend/.env
    echo "ALLOWED_HOSTS=localhost,127.0.0.1" >> backend/.env
fi

echo "====================================="
echo "Setting up database..."
echo "====================================="
cd backend
python manage.py makemigrations
python manage.py migrate
cd ..

echo "====================================="
echo "Starting servers..."
echo "====================================="
echo "Frontend will be available at: http://localhost:5173"
echo "Backend will be available at: http://localhost:8000"
echo "Press Ctrl+C to stop all servers"

# Start servers in background
(cd frontend && npm run dev) &
(cd backend && python manage.py runserver) &

# Wait for both background processes
wait
