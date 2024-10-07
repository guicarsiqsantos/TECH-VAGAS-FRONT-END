import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7188/api/",
});

// Interceptor para adicionar o header antes de cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
