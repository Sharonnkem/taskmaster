import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://task-master-qz24.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
