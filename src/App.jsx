import React, { useState, useEffect } from "react";
import { Users } from "./components/Users.jsx";
import api from "./api";

export const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((response) => setUsers(response));
    }, []);

    const handleDelete = (userId) =>
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    const handleToggleBookmark = (userId) => {
        const currentUserIndex = users.findIndex((user) => user._id === userId);
        const updatedUsers = [...users];
        updatedUsers[currentUserIndex].bookmark =
            !updatedUsers[currentUserIndex].bookmark;
        setUsers(updatedUsers);
    };

    return (
        <>
            <Users
                users={users}
                onDelete={handleDelete}
                onBookmarkToggle={handleToggleBookmark}
            />
        </>
    );
};
