import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import NavBar from "./components/ui/NavBar.jsx";
import { ToastContainer } from "react-toastify";
import { routes } from "./routes.jsx";
import { useSelector } from "react-redux";
import { getUserLoggedInStatus } from "./store/users.js";

export const App = () => {
    const isLoggedIn = useSelector(getUserLoggedInStatus());
    const location = useLocation();

    return (
        <>
            <NavBar/>
            {useRoutes(routes(isLoggedIn, location))}
            <ToastContainer/>
        </>
    );
};
