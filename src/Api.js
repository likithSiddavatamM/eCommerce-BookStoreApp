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
        const response = await axios.put(
            `${BASE_URL}cart/${bookId}`, 
            { quantity }, 
            {
                headers: {
                    Authorization: getAuth(),
                },
            }
        );
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

    // Add to wishlist API
    export const addToWishlistApi = async (bookId) => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Not authenticated');
    
      const response = await fetch(`http://localhost:7000/api/v1/wishlist/${bookId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    
      if (!response.ok) {
        throw new Error('Failed to add to wishlist');
      }
    
      const data = await response.json();
      return data;
    };
    

    // Forgot Password API
    export const forgotpassword = async (email) => {
        try {
      const response = await fetch(`${BASE_URL}users/forgotpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to Send Email");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Forgot Password Error:", error);
    throw error;
  }
};

    // Reset Password API
  export const resetpassword = async (password, token) => {
  try {
    const response = await fetch(`${BASE_URL}users/resetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to Reset Password");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Reset Password Error:", error);
    throw error;
  }
};
