import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

let debounceTimer;
const DEBOUNCE_DELAY = 300;

// Fetch books
export const allBooks = async (page) => {
  try {
    const response = await axios.get(`/books/${page}`);
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

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
