import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/login/Login.jsx";
import Main from "./layouts/Main.jsx";
import Users from "./layouts/Users.jsx";
import NavBar from "./components/ui/NavBar.jsx";
import NotFound from "./components/NotFound.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks";
import withRouteProtection from "./components/common/hoc/withRouteProtection.jsx";
import Logout from "./layouts/Logout.jsx";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities.js";
import { loadProfessionsList } from "./store/professions.js";

const ProtectedRouteUsers = withRouteProtection(Users);

export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);

    return (
        <>
            <AuthProvider>
                <NavBar/>
                <Switch>
                    <Route path="/login/:type?" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <ProtectedRouteUsers path="/users/:userId?/:edit?"/>
                    <Route exact path="/" component={Main}/>
                    <Route component={NotFound}/>
                </Switch>
            </AuthProvider>
            <ToastContainer/>
        </>
    );
};
