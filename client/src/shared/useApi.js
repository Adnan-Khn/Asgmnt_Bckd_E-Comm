
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../state/AuthContext";


export const useApi = () => {
  const { accessToken, setAccessToken } = useContext(AuthContext);

  const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    withCredentials: true,
  });

  apiInstance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !originalRequest.url?.includes("/auth/refresh")
      ) {
        originalRequest._retry = true;

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_APP_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = res.data.accessToken;

          setAccessToken(newAccessToken);

          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;

          return apiInstance(originalRequest);
        } catch (refreshError) {
          setAccessToken(null);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return apiInstance;
};
