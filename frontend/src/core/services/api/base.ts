import axios from 'axios';

// Base API service configuration
// En Docker: el backend está en http://backend:3000/api
// Desde el navegador: NO puede usar 'backend', debe usar el proxy o localhost:3001
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

console.log('📡 API Configuration:');
console.log('  - NODE_ENV:', process.env.NODE_ENV);
console.log('  - REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('  - Base URL:', API_BASE_URL);

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response successful:', response.status, response.config.url);
    
    // El backend devuelve { success: true, data: {...} }
    // Extraemos automáticamente el campo 'data' si existe
    if (response.data && typeof response.data === 'object') {
      if ('success' in response.data && 'data' in response.data) {
        // Respuesta envuelta del backend - extraer data
        response.data = response.data.data;
      }
    }
    
    return response;
  },
  (error) => {
    console.error('❌ API Response error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    });
    // Handle global errors here if needed
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

export default apiClient;