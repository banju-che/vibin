// src/axios/client.js
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://vibin-11es.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach access token
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
