import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/Login.jsx";
import Main from "./layouts/Main.jsx";
import Users from "./layouts/Users.jsx";
import NavBar from "./components/ui/NavBar.jsx";
import NotFound from "./components/NotFound.jsx";
import { ToastContainer } from "react-toastify";
import { UserProvider, ProfessionsProvider, QualitiesProvider, AuthProvider } from "./hooks";

export const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <ProfessionsProvider>
                    <QualitiesProvider>
                        <UserProvider>
                            <Switch>
                                <Route path="/login/:type?" component={Login} />
                                <Route path="/users/:userId?/:edit?" component={Users} />
                                <Route exact path="/" component={Main} />
                                <Route component={NotFound} />
                            </Switch>
                        </UserProvider>
                    </QualitiesProvider>
                </ProfessionsProvider>
            </AuthProvider>
            <ToastContainer/>
        </>
    );
};
