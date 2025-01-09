import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";

export const AuthRoute =({children})=>{
    const userDetails = useSelector((state) => state.user.userDetails);
    const auth=userDetails?.role == "admin";
    if(!auth){
        return children
    }
    return <Navigate to ='/admin'></Navigate>
}