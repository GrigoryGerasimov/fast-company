import React, { useState, useEffect, useContext } from "react";
import { userService } from "../services/userService.js";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader.jsx";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import PropTypes from "prop-types";

const UserContext = React.createContext();

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletedUserId, setDeletedUserId] = useState("");
    const currentUserId = useSelector(getCurrentUserId());

    const errorCatcher = error => {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    };

    const getUserById = id => users.find(user => user._id === id);

    const getUsers = async () => {
        try {
            const { content } = await userService.getAll();
            const filteredContent = content.filter(user => user._id !== currentUserId);
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

    const bookmarkUser = updatedUsers => {
        setUsers(updatedUsers);
    };

    useEffect(() => {
        getUsers();
    }, [deletedUserId]);

    useEffect(() => {
        error && toast.error(error);
        setError(null);
    }, [error]);

    return <UserContext.Provider value={{ users, getUserById, deleteUser, bookmarkUser }}>{!isLoading ? children : <Loader/>}</UserContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
