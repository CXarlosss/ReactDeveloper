import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // o directamente "http://localhost:4000/api"
  withCredentials: false, // si usas cookies, true. Para JWT, false.
});

// Añadir token a todas las peticiones automáticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
