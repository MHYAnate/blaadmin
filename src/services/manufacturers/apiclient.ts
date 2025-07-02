// src/lib/apiClient.ts (or a similar path)

import axios from 'axios';
import { Storage } from '@/lib/utils'; // Make sure the path to your Storage utility is correct

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api', // Your API's base URL
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from storage
    const token = Storage.get('token');

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default apiClient;