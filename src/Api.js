import axiosInstance from "./axiosInstance";

// Books API
export const allBooks = async (page) => {
  const response = await axiosInstance.get(`books/${page}`);
  return response.data.data;
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
  const response = await axiosInstance.put(`cart`, { bookId, quantity });
  return response.data;
};

export const getCartItemsApi = async () => {
  const response = await axiosInstance.get(`cart`);
  return response.data;
};

// Search API
export const searchedBooks = async (page, text) => {
  const response = await axiosInstance.get(`books/search/${page}`, {
    params: { searchQuery: text },
  });
  return response.data.data;
};
