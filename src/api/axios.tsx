// import axios from "axios";
// export const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

// const axiosInstance = axios.create({
//   baseURL: `${BASE_URL}/api`,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   withCredentials: true, // if using cookies
// });

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // You can show a toast here or redirect
//     if (error.response?.status === 401) {
//       console.error("Unauthorized, logging out...");
//       // Handle logout logic or redirect
//     } else if (error.response?.status === 500) {
//       console.error("Server error");
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;




import axios from "axios";
import { showSuccessToast, showErrorToast } from "@/utils/toast"; 

export const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        const response = await axios.post(
          `${BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = response.data.accessToken;
        localStorage.setItem("accessToken", newToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        showSuccessToast("Session refreshed successfully");
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        showErrorToast("Session expired. Please log in again.");
        localStorage.removeItem("accessToken");
        // Optional: redirect to login page
        window.location.href = "/";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    if (error.response?.status === 500) {
      showErrorToast("Server error. Please try again later.");
    } else if (error.response?.status === 403) {
      showErrorToast("Access denied.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

