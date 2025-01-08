import axiosInstance from "./axiosInstance";
import axios from "axios";
const BASE_URL = "http://localhost:7000/api/v1";
// Books API
export const allBooks = async (page) => {
  const response = await axiosInstance.get(`books/${page}`);
  return response.data.data;
};
const getAuth = () => {
    return `Bearer ${localStorage.getItem("accessToken")}`;
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


// Add to Wishlist API
export const addToWishlistApi = async (bookId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("Not authenticated");

    const response = await axios.post(
      `${BASE_URL}wishlist/${bookId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Add to Wishlist Error:", error);
    throw error.response?.data?.message || "Failed to add to wishlist";
  }
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
  const response = await axiosInstance.put(`cart/${bookId}`, { body: { quantityChange: quantity } });
  return response.data;
};

export const getCartItemsApi = async () => {
  const response = await axiosInstance.get(`cart`);
  return response.data;
};

export const searchedBooks = async(page, text, sort) => {

  const books = await axios.get(`${BASE_URL}books/search/${page}`, {params: {searchQuery: text, sortQuery: sort}})
        return books?.data?.data;
    };


// Forgot Password API
export const forgotpassword = async (email) => {
  try {
    const response = await axios.post(
      `${BASE_URL}users/forgotpassword`,
      { email },
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );

    return response.data;
  } catch (error) {
    console.error("Forgot Password Error:", error);
    throw error.response?.data?.message || "Failed to Send Email";
  }
};


// Reset Password API
export const resetpassword = async (password, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}users/resetpassword`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Reset Password Error:", error);
    throw error.response?.data?.message || "Failed to Reset Password";
  }
};

export const createBookByAdminApiCall = async (payload) => {
    return await axios.post(`${BASE_URL}/books`, payload, {
      headers: {
        Authorization: getAuth(),
      },
    });
  };


