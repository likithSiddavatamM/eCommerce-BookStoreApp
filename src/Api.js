import axios from "axios"

export const allBooks = async(page) => {

    const books = await axios.get(`http://localhost:3000/api/v1/books/${page}`)
    return books?.data?.data;

}