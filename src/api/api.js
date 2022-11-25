import axios from "axios";

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const axiosParams = {
  baseURL: "https://www.dnd5eapi.co/",
  headers: HEADERS,
};

// Axios instance
const axiosInstance = axios.create(axiosParams);

// Error handling
const errorInterceptor = (error) => {
  return Promise.reject(error);
};

// Success responses
const responseInterceptor = (response) => {
  return response;
};

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

// Main api function
const apiMethods = (axios) => {
  return {
    get: (url, config) => axios.get(url, config),
    post: (url, body, config) => axios.post(url, body, config),
    put: (url, body, config) => axios.put(url, body, config),
    patch: (url, body, config) => axios.patch(url, body, config),
    delete: (url, config) => axios.delete(url, config),
  };
};

export const api = apiMethods(axiosInstance);
