import React, { useState, useEffect, useContext } from "react";
import { userService } from "../services/userService.js";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth.jsx";
import Loader from "../components/common/Loader.jsx";

const UserContext = React.createContext();

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletedUserId, setDeletedUserId] = useState("");
    const { currentUser, newUser } = useAuth();

    const errorCatcher = error => {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    };

    const getUserById = id => users.find(user => user._id === id);

    const getUsers = async () => {
        try {
            const { content } = await userService.getAll();
            const filteredContent = content.filter(user => user._id !== currentUser._id);
            setUsers(filteredContent);
            setLoading(false);
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };

    const deleteUser = async userId => {
        try {
            const deletedId = await userService.delete(userId);
            setDeletedUserId(deletedId);
        } catch (error) {
            errorCatcher(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [newUser, deletedUserId]);

    useEffect(() => {
        error && toast.error(error);
        setError(null);
    }, [error]);

    return <UserContext.Provider value={{ users, getUserById, deleteUser }}>{!isLoading ? children : <Loader/>}</UserContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
