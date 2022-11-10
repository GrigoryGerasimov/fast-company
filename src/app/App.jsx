import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
// import Login from "./layouts/login/Login.jsx";
// import Main from "./layouts/Main.jsx";
// import Users from "./layouts/Users.jsx";
import NavBar from "./components/ui/NavBar.jsx";
// import NotFound from "./components/NotFound.jsx";
import { ToastContainer } from "react-toastify";
// import withRouteProtection from "./components/ui/hoc/withRouteProtection.jsx";
// import withUsersLoader from "./components/ui/hoc/withUsersLoader.jsx";
// import Logout from "./layouts/Logout.jsx";
import { routes } from "./routes.jsx";
import { useSelector } from "react-redux";
import { getUserLoggedInStatus } from "./store/users.js";

// const ProtectedRouteUsers = withRouteProtection(withUsersLoader(Users));

export const App = () => {
    const isLoggedIn = useSelector(getUserLoggedInStatus());
    const location = useLocation();

    return (
        <>
            <NavBar/>
            {useRoutes(routes(isLoggedIn, location))}
            {/* <Route path="/login/:type?" component={Login}/> */}
            {/* <Route path="/logout" component={Logout}/> */}
            {/* <ProtectedRouteUsers path="/users/:userId?/:edit?"/> */}
            {/* <Route exact path="/" component={Main}/> */}
            {/* <Route component={NotFound}/> */}
            <ToastContainer/>
        </>
    );
};
