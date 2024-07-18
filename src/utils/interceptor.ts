import axios, { AxiosInstance } from "axios";
import { getStorageItem, setStorageItem } from "./storageUtils";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuthInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getStorageItem("_at");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if ([401, 403].includes(error?.response?.status) && !error.config._retry) {
      originalRequest._retry = true;
      await generateAccessToken(originalRequest);
    }
    return Promise.reject(error);
  }
);
//@ts-ignore
const generateAccessToken = async (originalRequest) => {
  try {
    const refreshToken = getStorageItem("_rt");
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}generateAccessToken`,
      {
        rt: refreshToken,
      }
    );
    const { accessToken } = response.data;
    setStorageItem("_at", accessToken);
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    return axiosInstance(originalRequest); // Retry the original request with the new access token.
  } catch (refreshError) {
    // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
    console.error("Token refresh failed:", refreshError);
    localStorage.clear();
    !["/login", "/signup"].includes(location.pathname) &&
      location.replace("/login");
    return Promise.reject(refreshError);
  }
};
