import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

let debounceTimer;
const DEBOUNCE_DELAY = 300;

export const allBooks = async(page) => {

  const books = await axios.get(`/books/${page}`)
  return books?.data?.data;

}
// Search books
export const searchBooks = (query, page = 1) => {
  if (!query) {
    return Promise.reject(new Error("Search query is required."));
  }

  return new Promise((resolve, reject) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      axios
        .get(`/books/search/${page}`, { params: { searchQuery: query } }) 
        .then((response) => {
            const books = response.data.data || [];
            console.log('Book:',books)
            resolve(books);
          })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          reject(error);
        });
    }, DEBOUNCE_DELAY);
  });
};
export const getBookById = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/v1/books/book/${id}`);
    return response?.data?.data;
};
export const fetchUserOrders = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/orders'); 
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};
