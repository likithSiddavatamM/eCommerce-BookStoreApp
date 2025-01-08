import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Path_Sort from "../Path_Sort/Path_Sort";

export default () => {

    return (
    <>
        <Header/>
        <Path_Sort/>
        <div style={{minHeight:"88vh"}}>
            <Outlet/>
        </div>
        <Footer/>

    </>
    )

}