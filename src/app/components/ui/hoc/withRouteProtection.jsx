import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getUserLoggedInStatus } from "../../../store/users.js";

const withRouteProtection = Component => {
    const ReturnedRoute = ({ path, children }) => {
        const isLoggedIn = useSelector(getUserLoggedInStatus());
        return <Route path={path} render={(props) => !isLoggedIn ? <Redirect to={{ pathname: "/login", state: { from: props.location } }}/> : Component ? <Component {...props}/> : children}/>;
    };

    ReturnedRoute.propTypes = {
        path: PropTypes.string,
        location: PropTypes.object,
        children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    };

    return ReturnedRoute;
};

export default withRouteProtection;
