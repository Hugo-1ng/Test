# Notes App

A modern, full-stack web application for managing notes with categories. Built with Django REST Framework and React.

## Features

### Note Management
- Create, edit, and delete notes with rich text content
- Archive/unarchive notes for better organization
- View notes in an intuitive grid or list layout
- Full note content preview in a modal dialog
- Automatic timestamps for creation date

### Category System
- Organize notes with multiple categories
- Default "Uncategorized" category for notes without specific categories
- Create and manage custom categories
- Filter notes by category
- Category management interface
- Protected default category that cannot be deleted

### User Interface
- Clean, modern Material-UI design
- Responsive layout that works on all devices
- Intuitive navigation and controls
- Real-time updates without page refresh
- Consistent styling and animations

## Technology Stack

### Backend
- Python 3.11+
- Django 5.0
- Django REST Framework for API
- SQLite database
- django-cors-headers for CORS support

### Frontend
- React 18
- Vite for fast development and building
- Material-UI (MUI) components
- Axios for API communication
- React Router for navigation

## Prerequisites

Before running the application, ensure you have:

1. Python 3.11 or higher
   ```bash
   python --version  # Should be 3.11 or higher
   ```

2. Node.js 18 or higher
   ```bash
   node --version  # Should be 18 or higher
   ```

3. npm (comes with Node.js)
   ```bash
   npm --version  # Should be 9 or higher
   ```

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Hugo-1ng/Test.git
   cd Test
   ```

2. Run the application using the provided script:

   ### Windows
   ```bash
   ./run.bat
   ```

   ### Linux/Mac
   ```bash
   chmod +x run.sh
   ./run.sh
   ```

The setup script will automatically:
- Create and activate a Python virtual environment
- Install all Python dependencies
- Install Node.js dependencies
- Set up the SQLite database
- Apply all migrations
- Create the default category
- Start both backend and frontend development servers

## Accessing the Application

After running the setup script:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Admin Interface: http://localhost:8000/admin

## API Endpoints

### Notes
- `GET /api/notes/` - List all active notes
- `POST /api/notes/` - Create a new note
- `GET /api/notes/{id}/` - Get note details
- `PUT /api/notes/{id}/` - Update a note
- `DELETE /api/notes/{id}/` - Delete a note
- `POST /api/notes/{id}/archive/` - Archive a note
- `POST /api/notes/{id}/unarchive/` - Unarchive a note

### Categories
- `GET /api/categories/` - List all categories
- `POST /api/categories/` - Create a new category
- `DELETE /api/categories/{id}/` - Delete a category (except default)

## Project Structure

```
.
├── backend/
│   ├── backend/           # Django project settings
│   │   ├── settings.py    # Project settings
│   │   ├── urls.py       # Main URL routing
│   │   └── wsgi.py       # WSGI configuration
│   ├── notes/            # Notes application
│   │   ├── models.py     # Data models
│   │   ├── views.py      # API views
│   │   ├── urls.py       # API routing
│   │   └── serializers.py # API serializers
│   └── manage.py         # Django management script
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── NoteCard.jsx    # Note display component
│   │   │   ├── NoteForm.jsx    # Note creation/editing
│   │   │   └── CategoryForm.jsx # Category management
│   │   ├── services/     # API services
│   │   │   └── api.js    # API client
│   │   └── App.jsx       # Main application component
│   ├── package.json      # Node.js dependencies
│   └── vite.config.js    # Vite configuration
├── run.bat              # Windows setup script
├── run.sh               # Linux/Mac setup script
└── requirements.txt     # Python dependencies
```

## Development

### Running Tests
```bash
# Backend tests
cd backend
python manage.py test

# Frontend tests
cd frontend
npm test
```

### Code Style
- Backend follows PEP 8 Python style guide
- Frontend uses ESLint with Airbnb configuration
