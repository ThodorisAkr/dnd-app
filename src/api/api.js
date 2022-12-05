import axios from "axios";
import CONFIG from "@/common/config";

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const axiosParams = {
  baseURL: CONFIG.main_api,
  headers: HEADERS,
};

const directusParams = {
  baseURL: CONFIG.directus_api,
  headers: HEADERS,
};

// Axios instance
const axiosInstance = axios.create(axiosParams);
const directusInstance = axios.create(directusParams);

// Error handling
const errorInterceptor = (error) => {
  return Promise.reject(error);
};

// Success responses
const responseInterceptor = (response) => {
  return response;
};

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
directusInstance.interceptors.response.use(
  responseInterceptor,
  errorInterceptor
);

// Main api function
const apiMethods = (instance) => {
  return {
    get: (url, config) => instance.get(url, config),
    post: (url, body, config) => instance.post(url, body, config),
    put: (url, body, config) => instance.put(url, body, config),
    patch: (url, body, config) => instance.patch(url, body, config),
    delete: (url, config) => instance.delete(url, config),
  };
};

export const api = apiMethods(axiosInstance);
export const directusApi = apiMethods(directusInstance);
