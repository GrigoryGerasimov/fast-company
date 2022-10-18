import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/Login.jsx";
import Main from "./layouts/Main.jsx";
import Users from "./layouts/Users.jsx";
import NavBar from "./components/ui/NavBar.jsx";
import NotFound from "./components/NotFound.jsx";
import { ToastContainer } from "react-toastify";
import { ProfessionsProvider, QualitiesProvider, AuthProvider } from "./hooks";
import withRouteProtection from "./components/common/hoc/withRouteProtection.jsx";
import Logout from "./layouts/Logout.jsx";

const ProtectedRouteUsers = withRouteProtection(Users);

export const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar/>
                <ProfessionsProvider>
                    <QualitiesProvider>
                        <Switch>
                            <Route path="/login/:type?" component={Login}/>
                            <Route path="/logout" component={Logout}/>
                            <ProtectedRouteUsers path="/users/:userId?/:edit?"/>
                            <Route exact path="/" component={Main}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </QualitiesProvider>
                </ProfessionsProvider>
            </AuthProvider>
            <ToastContainer/>
        </>
    );
};
