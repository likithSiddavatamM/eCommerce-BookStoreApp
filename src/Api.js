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

export const fetchUserDataApiCall = async (END_POINT) => {
  return await axios.get(`${BASE_URL}${END_POINT}`, {
    headers: {
      Authorization: getAuth(),
    },
  });
};

export const updateUserDataApiCall = async (payload) => {
  return await axios.put(`http://localhost:7000/api/v1/users`, payload, {
    headers: {
      Authorization: getAuth(),
    },
  });
};

// Customer Details API
export const fetchCustomerDetailsApiCall = async (END_POINT) => {
  return await axios.get(`${BASE_URL}${END_POINT}`, {
    headers: {
      Authorization: getAuth(),
    },
  });
};

// Orders API
export const getOrderApiCall = async(END_POINT) => {
  return await axios.get(`${BASE_URL}${END_POINT}`,
      { 
          headers:{
             Authorization:getAuth()
           }
      }
  )
}

export const fetchUserAddressApiCall = async(END_POINT="/customer")=>{
    return await axios.get(`${BASE_URL}${END_POINT}`,
        { headers:{
            Authorization:getAuth()
         }
         }
    )
}

export const createUserAddressApiCall =  async(payload) => {
    return await axios.post(`http://localhost:7000/api/v1/customer/`,payload,{
     headers:{
         Authorization:getAuth()
     }
    })

}

// export const updateUserAddressApiCall =  async(END_POINT="/customer/67739748b3835b4838e375ef",payload) => {
//     return await axios.put(`${BASE_URL}${END_POINT}`,payload,{
//      headers:{
//          Authorization:getAuth()
//      }
//     })
//   }

export const updateUserAddressApiCall =  async(payload) => {
    return await axios.put(`http://localhost:7000/api/v1/customer/67739748b3835b4838e375ef`,payload,{
     headers:{
         Authorization:getAuth()
     }
    })
}

// Example: Create a new customer (optional if needed)
export const createCustomerApiCall = async (payload) => {
  return await axios.post(`${BASE_URL}customers`, payload, {
    headers: {
      Authorization: getAuth(),
    },
  });
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
        return response.data;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw error;
    }
};


export const searchedBooks = async(page, text) => {

    const books = await axios.get(`${BASE_URL}/books/search/${page}`, {params: {searchQuery: text}})
    console.log(books,"***")
    return books?.data?.data;

}

export const syncCartWithBackend = async (payload) => {
  return await axios.post(`http://localhost:7000/api/v1/cart/sync`, payload, {
    headers: {
      Authorization: getAuth(), // Ensure getAuth() returns "Bearer <token>"
    },
  });
};
