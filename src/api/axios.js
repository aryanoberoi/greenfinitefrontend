import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Your FastAPI server URL
  timeout: 10000,
});

export default api; // ✅ Default export
