import React, { useState, useEffect, useContext } from "react";
import { userService } from "../services/userService.js";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const errorCatcher = error => {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    };

    const getUserById = id => users.find(user => user._id === id);

    const getUsers = async () => {
        try {
            const { content } = await userService.getAll();
            setUsers(content);
            setIsLoading(false);
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        error && toast.error(error);
        setError(null);
    }, [error]);

    return <UserContext.Provider value={{ users, getUserById }}>{!isLoading ? children : "Loading..."}</UserContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
