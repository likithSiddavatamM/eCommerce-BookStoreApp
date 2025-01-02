import axios from "axios"

const BASE_URL=`http://localhost:7000/api/v1/`;

const getAuth =()=>{
    return `Bearer ${localStorage.getItem('accessToken')}`
}

export const allBooks = async(page) => {

    const books = await axios.get(`http://localhost:7000/api/v1/books/${page}`)
    return books?.data?.data;

}

export const loginApiCall = async(payload,END_POINT=`users/login`) => {
    return await axios.post(`${BASE_URL}${END_POINT}`, payload)
}

export const signupApiCall = async(payload,END_POINT=`users`)=>{
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

export const updateUserDataApiCall = async(payload) => {
    // console.log("Auth Token: ", getAuth());
    // console.log("Full URL: ", `${BASE_URL}${END_POINT}`);
    // console.log("end point", END_POINT)
    return await axios.put(`http://localhost:7000/api/v1/users`,payload,{
     headers:{
         Authorization:getAuth()
     }
    })
  }
 
export const getBookById = async (id) => {
    const response = await axios.get(`http://localhost:7000/api/v1/books/book/${id}`);
    return response?.data?.data;
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
