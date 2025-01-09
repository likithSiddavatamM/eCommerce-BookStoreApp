import axiosInstance from "./axiosInstance";
import axios from "axios";
const BASE_URL = "http://localhost:7000/api/v1";
// Helper function to get the Authorization header
const getAuth = () => {
  return `Bearer ${localStorage.getItem('accessToken')}`;
};

// Books API
export const allBooks = async (page, sort) => {
  const response = await axiosInstance.get(`books/${page}`,{params:{sortQuery: sort}});
  return response.data.data;
};

// AdminBooks API
export const fetchAdminBooks = async () => {
  const adminBooks = await axios.get(`${BASE_URL}books/adminbooks`,
    {
      headers: {
        Authorization: getAuth(),
      },
    }
  );
  return adminBooks?.data?.data;
};

//Delete book by admin
export const deleteAdminBooks = async (id) => {
  return await axios.delete(`${BASE_URL}books/${id}`, {
    headers: {
      Authorization: getAuth(),
    },
  });
};

export const getBookById = async (id) => {
  const response = await axiosInstance.get(`books/book/${id}`);
  return response.data.data;
};

// User API
export const loginApiCall = async (payload, END_POINT = "users/login") => {
  return await axiosInstance.post(END_POINT, payload);
};

export const signupApiCall = async (payload, END_POINT = "users") => {
  return await axiosInstance.post(END_POINT, payload);
};

export const fetchUserDataApiCall = async (END_POINT) => {
  return await axiosInstance.get(END_POINT);
};

export const updateUserDataApiCall = async (payload) => {
  return await axiosInstance.put(`users`, payload);
};

// Customer Details API
export const fetchCustomerDetailsApiCall = async (END_POINT) => {
  return await axiosInstance.get(END_POINT);
};

export const createCustomerApiCall = async (payload) => {
  return await axiosInstance.post(`customers`, payload);
};

// Orders API
export const getOrderApiCall = async (END_POINT) => {
  return await axiosInstance.get(END_POINT);
}

export const placeOrderApi = async (END_POINT) => {
  const response = await axiosInstance.post(END_POINT);
  return response.data;
};

// Address API
export const fetchUserAddressApiCall = async (END_POINT = "customer") => {
  return await axiosInstance.get(END_POINT);
};

export const createUserAddressApiCall = async (payload) => {
  return await axiosInstance.post(`customer/`, payload);
};

export const updateUserAddressApiCall = async (payload) => {
  return await axiosInstance.put(`customer/67739748b3835b4838e375ef`, payload);
};

// Cart API
export const addToCartApi = async (bookId) => {
  const response = await axiosInstance.post(`cart`, { bookId });
  return response.data;
};

export const removeFromCartApi = async (bookId) => {
  const response = await axiosInstance.delete(`cart/${bookId}`);
  return response.data;
};

export const updateCartQuantityApi = async (bookId, quantity) => {
  const response = await axiosInstance.put(`cart/${ bookId}`,body:{quantityChange: quantity });
  return response.data;
};

export const getCartItemsApi = async () => {
  const response = await axiosInstance.get(`cart`);
  return response.data;
};

export const searchedBooks = async(page, text, sort) => {

  const books = await axios.get(`${BASE_URL}books/search/${page}`, {params: {searchQuery: text, sortQuery: sort}})
    return books?.data?.data;

}

export const createBookByAdminApiCall = async (payload) => {
    return await axios.post(`${BASE_URL}/books`, payload, {
      headers: {
        Authorization: getAuth(),
      },
    });
  };

