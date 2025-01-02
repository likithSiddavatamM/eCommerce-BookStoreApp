import axios from "axios"

const BASE_URL=`http://localhost:3000/api/v1/`;

const getAuth =()=>{
    return `Bearer ${localStorage.getItem('accessToken')}`
}

export const allBooks = async(page) => {

    const books = await axios.get(`http://localhost:3000/api/v1/books/${page}`)
    return books?.data?.data;

}

export const loginApiCall = async(payload,END_POINT) => {
    return await axios.post(`${BASE_URL}${END_POINT}`, payload)
}

export const signupApiCall = async(payload,END_POINT)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,payload)
}


export const fetchUserDataApiCall = async(END_POINT="/users/")=>{
    return await axios.get(`${BASE_URL}${END_POINT}`,
        { headers:{
            Authorization:getAuth()
         }
         }
    )
}

export const updateUserDataApiCall = async(END_POINT="/users",payload) => {
    return await axios.put(`${BASE_URL}${END_POINT}`,payload,{
     headers:{
         Authorization:getAuth()
     }
    })
  }
 
export const getBookById = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/v1/books/book/${id}`);
    return response?.data?.data;
};

