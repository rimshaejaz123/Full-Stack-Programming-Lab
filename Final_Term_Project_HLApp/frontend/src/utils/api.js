import axios from 'axios';

// Open your frontend/src/utils/api.js
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Does this match your .env?
});

// Automatically attach the JWT token to every request if the user is logged in
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;