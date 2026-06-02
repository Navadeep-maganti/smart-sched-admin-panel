import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL =
  ((import.meta as any).env?.VITE_API_BASE_URL as string) || "/api";

const authToken = localStorage.getItem("access");

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<string | null> | null = null;

const clearSessionAndRedirect = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");

  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

const isAuthEndpoint = (url?: string) =>
  Boolean(url?.includes("/auth/login/") || url?.includes("/auth/refresh/"));

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh");
  if (!refreshToken) {
    return null;
  }

  const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
    refresh: refreshToken,
  });

  const newAccessToken = response.data?.access;
  const newRefreshToken = response.data?.refresh;

  if (!newAccessToken) {
    return null;
  }

  localStorage.setItem("access", newAccessToken);
  if (newRefreshToken) {
    localStorage.setItem("refresh", newRefreshToken);
  }

  return newAccessToken;
};

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: authToken ? `Bearer ${authToken}` : undefined,
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  config.headers = config.headers ?? {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const axiosError = error as AxiosError;
    const originalRequest = axiosError.config as
      | RetryableRequestConfig
      | undefined;

    if (
      axiosError.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthEndpoint(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise = refreshPromise ?? refreshAccessToken();
      const newAccessToken = await refreshPromise;
      refreshPromise = null;

      if (!newAccessToken) {
        clearSessionAndRedirect();
        return Promise.reject(error);
      }

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      refreshPromise = null;
      console.error("Token refresh failed:", refreshError);
      clearSessionAndRedirect();
    }

    return Promise.reject(error);
  },
);
