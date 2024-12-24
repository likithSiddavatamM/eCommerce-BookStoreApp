import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default () =>{

    return (
        <>
        <Header/>
        <Outlet/>
        </>
    )

}