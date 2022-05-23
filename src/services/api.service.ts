import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { BASE_URL } from "../constants";

// I wanted to implement the token refresh functionality
// with the Axios interceptor but it takes a lot of my time that's why I delayed it.

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token: string | null = localStorage.getItem("token");

  if (typeof token === "string" && config.headers) {
    config.headers["x-access-token"] = token;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response) {
    if (
      error.response.status === 401 &&
      //@ts-ignore
      error.response.data.message === "jwt expired"
    ) {
      const refresh_token = localStorage.getItem("refresh_token");

      try {
        const { data } = await axios.post(`${BASE_URL}/api/auth/refresh`, {
          refresh_token,
        });

        const { token } = data;

        localStorage.setItem("token", token);

        //@ts-ignore
        return;
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }

  return Promise.reject(error);
};

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
};

export const api = setupInterceptorsTo(
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
);
