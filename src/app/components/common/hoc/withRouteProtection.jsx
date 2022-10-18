import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth, UserProvider } from "../../../hooks";

const withRouteProtection = Component => {
    const ReturnedRoute = ({ path, children }) => {
        const { currentUser } = useAuth();
        return <Route path={path} render={(props) => !currentUser ? <Redirect to={{ pathname: "/login", state: { from: props.location } }}/> : Component ? (
            <UserProvider>
                <Component {...props}/>
            </UserProvider>
        ) : children}/>;
    };

    ReturnedRoute.propTypes = {
        path: PropTypes.string,
        location: PropTypes.object,
        children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    };

    return ReturnedRoute;
};

export default withRouteProtection;
