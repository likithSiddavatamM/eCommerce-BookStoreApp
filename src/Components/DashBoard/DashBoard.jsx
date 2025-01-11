import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Path_Sort from "../Path_Sort/Path_Sort";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "../../Routing/ProtectedRoute";
import { Suspense, lazy } from "react";
const Admin = lazy(() => import("../Admin/Admin"));

export default () => {
    const userDetails = useSelector((state) => state.user.userDetails);
    const isAdmin=userDetails?.role == "admin";

    return (
        <>
            {isAdmin ? (
                <>
                <Header />
                <Suspense><ProtectedRoute><Admin /></ProtectedRoute></Suspense>
                </>
            ) : (
                <>
                    <Header />
                    <Path_Sort />
                    <div style={{ minHeight: "88vh" }}>
                        <Outlet />
                    </div>
                    <Footer />
                </>
            )}
        </>
    )

}