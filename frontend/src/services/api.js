import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = {
  // Notes
  getNotes: (archived = false, category = null) => {
    let url = `${API_URL}/notes/?archived=${archived}`;
    if (category) url += `&category=${category}`;
    return axios.get(url);
  },
  createNote: (note) => axios.post(`${API_URL}/notes/`, note),
  updateNote: (id, note) => axios.put(`${API_URL}/notes/${id}/`, note),
  deleteNote: (id) => axios.delete(`${API_URL}/notes/${id}/`),
  archiveNote: (id) => axios.post(`${API_URL}/notes/${id}/archive/`),
  unarchiveNote: (id) => axios.post(`${API_URL}/notes/${id}/unarchive/`),

  // Categories
  getCategories: () => axios.get(`${API_URL}/categories/`),
  createCategory: (category) => axios.post(`${API_URL}/categories/`, category),
  deleteCategory: (id) => axios.delete(`${API_URL}/categories/${id}/`),
};

export default api;
