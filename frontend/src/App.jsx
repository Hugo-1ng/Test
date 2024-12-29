import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Alert,
  Fade,
  ToggleButton,
  ToggleButtonGroup,
  List,
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';
import CategoryForm from './components/CategoryForm';
import api from './services/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openNoteForm, setOpenNoteForm] = useState(false);
  const [openCategoryForm, setOpenCategoryForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: 'success', show: false });
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, [selectedCategory, activeTab]);

  const showFeedback = (message, type = 'success') => {
    setFeedback({ message, type, show: true });
    setTimeout(() => setFeedback(prev => ({ ...prev, show: false })), 3000);
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await api.getNotes(activeTab === 1, selectedCategory);
      setNotes(response.data);
    } catch (error) {
      showFeedback('Error fetching notes', 'error');
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories();
      setCategories(response.data);
    } catch (error) {
      showFeedback('Error fetching categories', 'error');
      console.error('Error fetching categories:', error);
    }
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        await api.updateNote(editingNote.id, noteData);
        showFeedback('Note updated successfully');
      } else {
        await api.createNote(noteData);
        showFeedback('Note created successfully');
      }
      setEditingNote(null);
      fetchNotes();
    } catch (error) {
      showFeedback('Error saving note', 'error');
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await api.deleteNote(id);
      showFeedback('Note deleted successfully');
      fetchNotes();
    } catch (error) {
      showFeedback('Error deleting note', 'error');
      console.error('Error deleting note:', error);
    }
  };

  const handleArchiveNote = async (note) => {
    try {
      if (note.archived) {
        await api.unarchiveNote(note.id);
        showFeedback('Note unarchived successfully');
      } else {
        await api.archiveNote(note.id);
        showFeedback('Note archived successfully');
      }
      fetchNotes();
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
        (error.response?.status === 404 ? 'Note not found' : 'Error updating note archive status');
      showFeedback(errorMessage, 'error');
      if (error.response?.status === 404) {
        // Refresh the notes list if the note was not found
        fetchNotes();
      }
      console.error('Error archiving note:', error);
    }
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      await api.createCategory(categoryData);
      showFeedback('Category created successfully');
      fetchCategories();
    } catch (error) {
      showFeedback('Error creating category', 'error');
      console.error('Error creating category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await api.deleteCategory(categoryId);
      showFeedback('Category deleted successfully');
      setSelectedCategory('');
      fetchCategories();
    } catch (error) {
      showFeedback('Error deleting category', 'error');
      console.error('Error deleting category:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedCategory(''); // Reset category filter when switching tabs
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ pt: 2, pb: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Notes App
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Active Notes" />
          <Tab label="Archived Notes" />
        </Tabs>
      </Box>

      <Box sx={{ height: '56px', mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {activeTab === 0 && (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  setEditingNote(null);
                  setOpenNoteForm(true);
                }}
              >
                New Note
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpenCategoryForm(true)}
              >
                New Category
              </Button>
            </>
          )}
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', ml: 'auto' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter by Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Filter by Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Manage Categories</InputLabel>
              <Select
                value=""
                label="Manage Categories"
                onChange={(e) => {
                  if (e.target.value) {
                    handleDeleteCategory(e.target.value);
                  }
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select to Delete</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    Delete "{category.name}"
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, newMode) => newMode && setViewMode(newMode)}
              sx={{ ml: 2 }}
            >
              <ToggleButton value="grid" aria-label="grid view">
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Stack>
      </Box>

      <Fade in={feedback.show}>
        <Alert 
          severity={feedback.type} 
          sx={{ mb: 2 }}
          onClose={() => setFeedback(prev => ({ ...prev, show: false }))}
        >
          {feedback.message}
        </Alert>
      </Fade>

      <Box sx={{ position: 'relative', minHeight: '200px' }}>
        {loading ? (
          <Typography variant="body1" color="text.secondary" align="center">
            Loading...
          </Typography>
        ) : (
          <>
            {viewMode === 'list' ? (
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={activeTab === 0 ? (note) => {
                      setEditingNote(note);
                      setOpenNoteForm(true);
                    } : null}
                    onDelete={activeTab === 0 ? handleDeleteNote : null}
                    onArchive={handleArchiveNote}
                    viewMode="list"
                  />
                ))}
              </List>
            ) : (
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
                {notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={activeTab === 0 ? (note) => {
                      setEditingNote(note);
                      setOpenNoteForm(true);
                    } : null}
                    onDelete={activeTab === 0 ? handleDeleteNote : null}
                    onArchive={handleArchiveNote}
                    viewMode="grid"
                  />
                ))}
              </Box>
            )}
            {notes.length === 0 && (
              <Typography variant="body1" color="text.secondary" align="center">
                {activeTab === 0 ? 'No active notes found' : 'No archived notes found'}
                {selectedCategory && ' for the selected category'}
              </Typography>
            )}
          </>
        )}
      </Box>

      <NoteForm
        open={openNoteForm}
        onClose={() => {
          setOpenNoteForm(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        note={editingNote}
        categories={categories}
      />

      <CategoryForm
        open={openCategoryForm}
        onClose={() => setOpenCategoryForm(false)}
        onSave={handleSaveCategory}
        onCategoryChange={fetchCategories}
        categories={categories}
        api={api}
      />
    </Container>
  );
}

export default App;
