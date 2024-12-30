import axios from "axios"

export const allBooks = async(page) => {

    const books = await axios.get(`http://localhost:7000/api/v1/books/${page}`)
    return books?.data?.data;

}

export const getBookById = async (id) => {
    const response = await axios.get(`http://localhost:7000/api/v1/books/book/${id}`);
    return response?.data?.data;
};
