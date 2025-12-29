import axios from "axios";

// Use environment variable for API URL, fallback to relative path for dev proxy
const API_URL = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
