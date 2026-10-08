import axios from "axios";
import { API_URL } from "../constant/config";

if (!API_URL) {
  throw new Error("VITE_PUBLIC_API_URL must be set to the backend API base URL.");
}

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Function for GET requests
export const getJsonResponse = (
  url,
  config
) => {
  return apiClient
    .get(url, config)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    });
};

// Function for POST requests
export const postJsonResponse = (
  url,
  data,
  config
) => {
  return apiClient
    .post(url, data, config)
    .then((response) => response.data)
    .catch((error) => {
      throw error
    });
};

// Function for PATCH requests
export const patchJsonResponse = (
  url,
  data,
  config
) => {
  return apiClient
    .patch(url, data, config)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// Function for PUT requests
export const putJsonResponse = (
  url,
  data,
  config
) => {
  return apiClient
    .put(url, data, config)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// Function for DELETE requests
export const deleteJsonResponse = (
  url,
  config,
) => {
  return apiClient
    .delete(url, config)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
