import { useContext } from "react";
import { AuthContext } from "../state/AuthContext";
import axios from "axios";

export const useApi = () => {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  console.log(import.meta.env.AuthContext);
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

  //for handling 401 error

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const res = await axios.post(
          `S{import.meta.env.VITE_APP_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        setAccessToken(res.data.accessToken);
        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axios(error.config);
      }
      return Promise.reject(error);
    },
  );
  return apiInstance;
};
