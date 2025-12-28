import axios from "axios";

// Function for GET requests
export const getJsonResponse = (
  url,
  config
) => {
  return axios
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
  return axios
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
  return axios
    .patch(url, data, config)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.message);
    });
};

// Function for PUT requests
export const putJsonResponse = (
  url,
  data,
  config
) => {
  return axios
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
  return axios
    .delete(url, config)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
