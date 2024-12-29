import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000, // 5 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const api = {
  // Notes
  getNotes: async (archived = false, category = null) => {
    try {
      let url = `/notes/?archived=${String(archived)}`;
      if (category) url += `&category=${category}`;
      return await axiosInstance.get(url);
    } catch (error) {
      console.error('Error getting notes:', error);
      throw error;
    }
  },

  createNote: async (note) => {
    try {
      return await axiosInstance.post('/notes/', note);
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  updateNote: async (id, note) => {
    try {
      return await axiosInstance.put(`/notes/${id}/`, note);
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  deleteNote: async (id) => {
    try {
      return await axiosInstance.delete(`/notes/${id}/`);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  archiveNote: async (id) => {
    try {
      return await axiosInstance.post(`/notes/${id}/archive/`);
    } catch (error) {
      console.error('Error archiving note:', error);
      throw error;
    }
  },

  unarchiveNote: async (id) => {
    try {
      return await axiosInstance.post(`/notes/${id}/unarchive/`);
    } catch (error) {
      console.error('Error unarchiving note:', error);
      throw error;
    }
  },

  // Categories
  getCategories: async () => {
    try {
      return await axiosInstance.get('/categories/');
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  },

  createCategory: async (category) => {
    try {
      return await axiosInstance.post('/categories/', category);
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      return await axiosInstance.delete(`/categories/${id}/`);
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },
};

export default api;
