# Notes Application

A web application that allows users to take notes, tag them, and filter them.

## Requirements

- Python 3.8+
- Node.js 18.17+
- npm 9+

## Backend Dependencies

- Django 5.0
- Django REST Framework 3.14.0
- django-cors-headers 4.3.1
- python-dotenv 1.0.0

## Frontend Dependencies

- React 18
- Vite
- React Router DOM 7
- Tailwind CSS

## Project Structure

```
├── backend/          # Django REST API
├── frontend/         # React Frontend
├── requirements.txt  # Python dependencies
└── run.bat          # Script to run the application (Windows)
└── run.sh           # Script to run the application (macOS/Linux)
```

## Setup and Running

### Quick Start

#### Windows
Simply run the `run.bat` script in the root directory:
```bash
run.bat
```

Or you can run it from the command line on the root directory:
```
./run.bat
```

#### macOS/Linux
Make the script executable and run it:
```bash
chmod +x run.sh
./run.sh
```

These scripts will:
1. Check prerequisites (Python and Node.js)
2. Set up Python virtual environment
3. Install all dependencies (both Python and Node.js)
4. Set up the database
5. Start both frontend and backend servers

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

### Manual Setup

If you prefer to set up manually:

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Install Node.js dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Set up the database:
   ```bash
   cd backend
   python manage.py migrate
   ```

5. Start the servers:
   - Backend:
     ```bash
     cd backend
     python manage.py runserver
     ```
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```

## API Endpoints

- `GET /api/notes/` - List all active notes
- `POST /api/notes/` - Create a new note
- `GET /api/notes/{id}/` - Retrieve a specific note
- `PUT /api/notes/{id}/` - Update a note
- `DELETE /api/notes/{id}/` - Archive a note (soft delete)
- `GET /api/notes/archived/` - List archived notes
- `POST /api/notes/{id}/archive/` - Archive a note
- `POST /api/notes/{id}/unarchive/` - Unarchive a note
- `GET /api/categories/` - List all categories
- `POST /api/categories/` - Create a new category
