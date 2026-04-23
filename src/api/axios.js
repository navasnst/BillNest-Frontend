
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// 🔥 Add this interceptor
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  if (adminToken) {
    req.headers.Authorization = `Bearer ${adminToken}`;
  }else if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
