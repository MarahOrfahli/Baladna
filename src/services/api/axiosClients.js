import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "multipart/form-data" }
});

export const nominatimAPI = axios.create({
  baseURL: import.meta.env.VITE_NOMINATIM_BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!config.headers)  config.headers = {};
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(error);
    }
    if (error.response?.status === 403) {
      error.message = "Forbidden Access";
      return Promise.reject(error);
    }
    if (error.response?.status >= 500) {
      error.message = "Server Under Maintenance";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);


