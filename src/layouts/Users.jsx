import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { UserPage } from "../components/common/page/userPage";
import { UsersListPage } from "../components/common/page/userListPage";

const Users = () => {
    const [user, setUser] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        API.users.getById(userId).then(userData => setUser(userData));
    }, [userId]);

    return userId ? <UserPage user={user} /> : <UsersListPage />;
};

export default Users;
