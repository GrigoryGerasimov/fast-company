import React, { useState, useEffect, useContext } from "react";
import { userService } from "../services/userService.js";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth.jsx";

const UserContext = React.createContext();

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletedUser, setDeletedUser] = useState({});
    const { newUser } = useAuth();

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

    const deleteUser = async userId => {
        try {
            const deletedUser = await userService.delete(userId);
            setDeletedUser(deletedUser);
        } catch (error) {
            errorCatcher(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [newUser, deletedUser]);

    useEffect(() => {
        error && toast.error(error);
        setError(null);
    }, [error]);

    return <UserContext.Provider value={{ users, getUserById, deleteUser }}>{!isLoading ? children : "Loading..."}</UserContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
