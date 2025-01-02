import axios from "axios";

const BASE_URL = `http://localhost:7000/api/v1/`;

// Helper function to get the Authorization header
const getAuth = () => {
  return `Bearer ${localStorage.getItem('accessToken')}`;
};

// Books API
export const allBooks = async (page) => {
  const books = await axios.get(`${BASE_URL}books/${page}`);
  return books?.data?.data;
};

export const getBookById = async (id) => {
  const response = await axios.get(`${BASE_URL}books/book/${id}`);
  return response?.data?.data;
};

// User API
export const loginApiCall = async (payload, END_POINT = "users/login") => {
  return await axios.post(`${BASE_URL}${END_POINT}`, payload);
};

export const signupApiCall = async (payload, END_POINT = "users") => {
  return await axios.post(`${BASE_URL}${END_POINT}`, payload);
};

export const fetchUserDataApiCall = async (END_POINT = "users") => {
  return await axios.get(`${BASE_URL}${END_POINT}`, {
    headers: {
      Authorization: getAuth(),
    },
  });
};

export const updateUserDataApiCall = async (END_POINT = "users", payload) => {
  return await axios.put(`${BASE_URL}${END_POINT}`, payload, {
    headers: {
      Authorization: getAuth(),
    },
  });
};

// Customer Details API
export const fetchCustomerDetailsApiCall = async () => {
  return await axios.get(`${BASE_URL}customers`, {
    headers: {
      Authorization: getAuth(),
    },
  });
};

// Orders API
export const getOrdersApiCall = async () => {
  try {
    const response = await axios.get(`${BASE_URL}orders`, {
      headers: {
        Authorization: getAuth(),
      },
    });
    console.log(`${BASE_URL}orders`)
    console.log(response?.data?.data)
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; 
  }
};

// Example: Create a new customer (optional if needed)
export const createCustomerApiCall = async (payload) => {
  return await axios.post(`${BASE_URL}customers`, payload, {
    headers: {
      Authorization: getAuth(),
    },
  });
};
