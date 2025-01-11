import axios from "axios";
const BASE_URL = "http://localhost:7000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
let isRefreshing = false;
let refreshSubscribers = [];
const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(`[Request] URL: ${config.url} | Method: ${config.method} | Token: ${accessToken}`);
    
    if (accessToken) {
      if (typeof accessToken === 'string') {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        console.error('Access token is not a string:', accessToken);
      }
    } else {
      console.error('No access token found in localStorage');
    }

    return config;
  },
  (error) => {
    console.error("[Request Error]:", error);
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    //401 (Unauthorized) 
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }
      isRefreshing = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        const response = await axios.get(`${BASE_URL}/users/refreshtoken`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        const { accessToken } = response.data.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        console.log("New access token received:", accessToken);
        onTokenRefreshed(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        isRefreshing = false;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/"; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
