import React, { useState } from "react";
import { SearchStatus } from "./components/SearchStatus.jsx";
import { Users } from "./components/Users.jsx";
import api from "./api";

export const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

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
            <SearchStatus length={users.length} />
            <Users
                users={users}
                onDelete={handleDelete}
                onBookmarkToggle={handleToggleBookmark}
            />
        </>
    );
};
