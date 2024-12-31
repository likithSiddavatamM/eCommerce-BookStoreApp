import React from "react";
import { Outlet } from "react-router-dom";

export default () => {

    return (
        <div style={{height:"100%"}}>
            <Outlet/>
        </div>
    )

}