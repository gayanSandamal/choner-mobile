import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';

export const getAxios = (authenticate?: boolean) => {
  const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_FB_URL,
    timeout: process.env.EXPO_PUBLIC_DEFAULT_TIMEOUT
      ? parseInt(process.env.EXPO_PUBLIC_DEFAULT_TIMEOUT)
      : 0,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  })

  axiosInstance.interceptors.request.use(
    async (request) => {
      const session = await SecureStore.getItemAsync('session')
      const auth = getAuth();
      const token = auth.currentUser?.stsTokenManager?.accessToken

      if (token && session && authenticate) {
        request.headers.Authorization = `Bearer ${token}`
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const auth = getAuth();
        const user = auth.currentUser

        if (user) {
          const newToken = await user.getIdToken(true)
          originalRequest.headers.Authorization = `Bearer ${newToken}`

          return axiosInstance(originalRequest)
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
