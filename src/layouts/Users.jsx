import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { UserPage, EditorPage } from "../components/common/page/userPage";
import { UsersListPage } from "../components/common/page/userListPage";
import ContainerWrapper from "../components/ui/ContainerWrapper.jsx";

const Users = () => {
    const [user, setUser] = useState({});
    const { userId, edit } = useParams();

    useEffect(() => {
        API.users.getById(userId).then(userData => setUser(userData));
    });

    return userId ? edit ? (
        <ContainerWrapper title="Изменение данных">
            {user._id && <EditorPage user={{
                ...user,
                qualities: user.qualities.map(qualityName => ({
                    value: qualityName._id,
                    label: qualityName.name,
                    color: qualityName.color
                }))
            }} id={userId}/>}
        </ContainerWrapper>
    ) : (
        <ContainerWrapper title="Страница пользователя">
            <UserPage user={user} id={userId} />
        </ContainerWrapper>
    ) : <UsersListPage />;
};

export default Users;
