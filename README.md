# Notes App

A full-stack web application for managing notes with categories.

## Features

- Create, edit, and delete notes
- Archive/unarchive notes
- Categorize notes with multiple categories
- Default "Uncategorized" category for notes without specific categories
- Filter notes by category
- View notes in grid or list layout
- View full note content in a modal
- Manage categories (create/delete)
- Responsive design

## Technology Stack

### Backend
- Python 3.11+
- Django 5.0
- Django REST Framework
- SQLite database

### Frontend
- React 18
- Vite
- Material-UI (MUI)
- Axios for API calls

## Prerequisites

Before running the application, make sure you have:

1. Python 3.11 or higher installed
2. Node.js 18 or higher installed
3. npm (comes with Node.js)

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Hugo-1ng/Test.git
   cd Test
   ```

2. Run the application:

   ### Windows
   ```bash
   run.bat
   ```

   ### Linux/Mac
   ```bash
   chmod +x run.sh
   ./run.sh
   ```

The script will:
- Create a Python virtual environment
- Install Python dependencies
- Install Node.js dependencies
- Set up the database
- Start both backend and frontend servers

## Accessing the Application

After running the setup script:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api

## API Endpoints

- `/api/notes/` - CRUD operations for notes
- `/api/categories/` - CRUD operations for categories
- `/api/notes/{id}/archive/` - Archive a note
- `/api/notes/{id}/unarchive/` - Unarchive a note

## Development

### Project Structure

```
.
├── backend/
│   ├── backend/         # Django project settings
│   ├── notes/           # Notes app
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   └── App.jsx
│   └── package.json
├── run.bat             # Windows setup script
├── run.sh              # Linux/Mac setup script
└── requirements.txt    # Python dependencies
