import axios from "axios";

const BASE_URL = `http://localhost:7000/api/v1/`;

const getAuth = () => {
  return `Bearer ${localStorage.getItem('accessToken')}`;
};
// Books API
export const allBooks = async (page, sort) => {
  const books = await axios.get(`${BASE_URL}books/${page}`, {params: {sortQuery: sort}});
  return books?.data?.data;
};

export const getBookById = async (id) => {
  const response = await axios.get(`${BASE_URL}books/book/${id}`);
  return response?.data?.data;
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

export const createBookByAdminApiCall = async (payload) => {
  return await axios.post(`${BASE_URL}/books`, payload, {
    headers: {
      Authorization: getAuth(),
    },
  });
};

//Delete book by admin
export const deleteAdminBooks = async (id) => {
  return await axios.delete(`${BASE_URL}books/${id}`, {
    headers: {
      Authorization: getAuth(),
    },
  });
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

export const updateUserDataApiCall = async (payload) => {
  return await axios.put(`${BASE_URL}users`, payload, {
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

export const createCustomerApiCall = async (payload) => {
  return await axios.post(`${BASE_URL}customers`, payload, {
    headers: {
      Authorization: getAuth(),
    },
  });
};

export const fetchUserAddressApiCall = async(END_POINT="/customer")=>{
  return await axios.get(`${BASE_URL}${END_POINT}`,
      { headers:{
          Authorization:getAuth()
       }
       }
  )
}

export const createUserAddressApiCall =  async(payload) => {
  return await axios.post(`${BASE_URL}customer`,payload,{
   headers:{
       Authorization:getAuth()
   }
  })

}

export const updateUserAddressApiCall =  async(payload,addressId) => {
  return await axios.put(`${BASE_URL}customer/${addressId}`,payload,{
   headers:{
       Authorization:getAuth()
   }
  })
}

// Orders API
export const getOrderApiCall = async (END_POINT) => {
  return await axios.get(`${BASE_URL}orders`, {
    headers: {
      Authorization: getAuth(),
    },
  });
}

export const placeOrderApi = async (END_POINT) => {
  const response = await axios.post(`${BASE_URL}orders`, {},{
    headers: {
      Authorization: getAuth(),
    },
  });
  return response.data;
};

export const addToCartApi = async (bookId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}cart/${bookId}`,
      {},
      {
        headers: {
          Authorization: getAuth(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error?.response?.data || error.message);
    throw error;
  }
};

export const removeFromCartApi = async (bookId) => {
    try {
        const response = await axios.delete(`${BASE_URL}cart/${bookId}`, {
            headers: {
                Authorization: getAuth()
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing from cart:", error);
        throw error;
    }
};

export const updateCartQuantityApi = async (bookId, quantity) => {
  try {
    console.log(`Sending API request to update quantity for book ${bookId} to ${quantity}`);
    const response = await axios.put(
      `${BASE_URL}cart/${bookId}`,
      {quantityChange: quantity },
      {
        headers: {
          Authorization: getAuth(),
        },
      }
    );
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating cart quantity:", error?.response?.data || error.message);
    throw error;
  }
};

export const getCartItemsApi = async () => {
    try {
        const response = await axios.get(`${BASE_URL}cart`, {
            headers: {
                Authorization: getAuth()
            }
        });
        return response;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw error;
    }
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
// Search API
export const searchedBooks = async(page, text, sort) => {
  const books = await axios.get(`${BASE_URL}books/search/${page}`, {params: {searchQuery: text, sortQuery: sort}})
    return books?.data?.data;

}
