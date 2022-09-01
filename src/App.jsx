import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/Login.jsx";
import Main from "./layouts/Main.jsx";
import UsersList from "./components/UsersList.jsx";
import NavBar from "./components/NavBar.jsx";
import NotFound from "./components/NotFound.jsx";

export const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UsersList} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
};
