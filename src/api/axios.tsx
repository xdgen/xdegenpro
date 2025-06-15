import axios from "axios";
export const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // if using cookies
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can show a toast here or redirect
    if (error.response?.status === 401) {
      console.error("Unauthorized, logging out...");
      // Handle logout logic or redirect
    } else if (error.response?.status === 500) {
      console.error("Server error");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
