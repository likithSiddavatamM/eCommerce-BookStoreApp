import axios from "axios"

const BASE_URL = `http://localhost:3000/api/v1/`;

const getAuth = () => {
    return `Bearer ${localStorage.getItem('accessToken')}`
}

export const allBooks = async(page) => {
    const books = await axios.get(`${BASE_URL}books/${page}`)
    return books?.data?.data;
}

export const loginApiCall = async(payload, END_POINT) => {
    return await axios.post(`${BASE_URL}${END_POINT}`, payload)
}

export const signupApiCall = async(payload, END_POINT) => {
    return await axios.post(`${BASE_URL}${END_POINT}`, payload)
}

export const fetchUserDataApiCall = async(END_POINT="/users/") => {
    return await axios.get(`${BASE_URL}${END_POINT}`,
        { headers: {
            Authorization: getAuth()
         }
        }
    )
}

export const updateUserDataApiCall = async(END_POINT="/users", payload) => {
    return await axios.put(`${BASE_URL}${END_POINT}`, payload, {
     headers: {
         Authorization: getAuth()
     }
    })
}
 
export const getBookById = async (id) => {
    const response = await axios.get(`${BASE_URL}books/book/${id}`);
    return response?.data?.data;
};


export const addToCartApi = async (bookId) => {
    try {
        const response = await axios.post(`${BASE_URL}cart`, { bookId }, {
            headers: {
                Authorization: getAuth()
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);
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
        const response = await axios.put(`${BASE_URL}cart`, { bookId, quantity }, {
            headers: {
                Authorization: getAuth()
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating cart quantity:", error);
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