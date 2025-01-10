import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";

export const ProtectedRoute =({children})=>{
    const userDetails = useSelector((state) => state.user.userDetails);
    const auth=userDetails?.role == "admin";
    if(auth){
        return children
    }
    return <Navigate to ='/notfound'></Navigate>
}