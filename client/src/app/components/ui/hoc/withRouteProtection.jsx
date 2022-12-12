import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getUserLoggedInStatus } from "../../../store/users.js";

const withRouteProtection = Component => {
    const ReturnedRoute = ({ path, children }) => {
        const isLoggedIn = useSelector(getUserLoggedInStatus());
        const location = useLocation();
        return <Route path={path} element={!isLoggedIn ? <Navigate to="/login" state={{ from: location }}/> : Component ? <Component/> : children}/>;
    };

    ReturnedRoute.propTypes = {
        path: PropTypes.string,
        location: PropTypes.object,
        children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    };

    return ReturnedRoute;
};

export default withRouteProtection;
