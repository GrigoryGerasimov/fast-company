import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/index.js";
import { UserPage } from "./UserPage.jsx";
import Users from "../layouts/Users.jsx";

const UsersList = () => {
    const [user, setUser] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        API.users.getById(userId).then(userData => setUser(userData));
    }, [userId]);

    return userId ? <UserPage user={user} /> : <Users />;
};

export default UsersList;
