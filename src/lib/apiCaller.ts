import axios from "axios";


import { API_URL_DOMAIN, API_WAIT_TIMEOUT } from "@/utils/constants";
import { logHelper } from "@/utils/utils";


const axiosInstancePrivate = axios.create({
  baseURL: API_URL_DOMAIN,
  timeout: API_WAIT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstancePublic = axios.create({
  baseURL: API_URL_DOMAIN,
  timeout: API_WAIT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstancePrivate.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");
    
    if (!token) {
      logHelper("No token found in localStorage for api call", config);
      // window.location.reload();
      return Promise.reject("No token found in localStorage for api call");
    } else {
      config.headers.authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    logHelper("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

axiosInstancePrivate.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 400) {
      return Promise.resolve(error.response);
    }

    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }

    return Promise.reject(error.response);
  }
);

export { axiosInstancePrivate, axiosInstancePublic };