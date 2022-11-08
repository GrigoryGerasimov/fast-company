import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/login/Login.jsx";
import Main from "./layouts/Main.jsx";
import Users from "./layouts/Users.jsx";
import NavBar from "./components/ui/NavBar.jsx";
import NotFound from "./components/NotFound.jsx";
import { ToastContainer } from "react-toastify";
import withRouteProtection from "./components/ui/hoc/withRouteProtection.jsx";
import withUsersLoader from "./components/ui/hoc/withUsersLoader.jsx";
import Logout from "./layouts/Logout.jsx";

const ProtectedRouteUsers = withRouteProtection(withUsersLoader(Users));

export const App = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path="/login/:type?" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <ProtectedRouteUsers path="/users/:userId?/:edit?"/>
                <Route exact path="/" component={Main}/>
                <Route component={NotFound}/>
            </Switch>
            <ToastContainer/>
        </>
    );
};
