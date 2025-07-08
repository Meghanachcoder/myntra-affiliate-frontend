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
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    // Instead of rejecting, just let request continue without token.
    // The backend should respond with 401 if unauthorized.
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
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_details");
      // Instead of reload, redirect to login page once:
      window.location.href = "/login";
      // Or you can use a state management flag to avoid reload loops
      // But direct redirect is simpler here.
      return; // stop here
    }

    return Promise.reject(error);
  }
);


export { axiosInstancePrivate, axiosInstancePublic };