import React from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { UserPage, EditorPage } from "../components/common/page/userPage";
import { UsersListPage } from "../components/common/page/userListPage";
import ContainerWrapper from "../components/ui/ContainerWrapper.jsx";
import { useUsers, useAuth } from "../hooks";

const Users = () => {
    const { userId, edit } = useParams();
    const { currentUser } = useAuth();
    const { getUserById } = useUsers();
    const user = currentUser._id === userId ? currentUser : getUserById(userId);
    const history = useHistory();

    return userId ? edit ? userId === currentUser._id ? (
        <ContainerWrapper>
            <button
                className="btn btn-primary offset-1 m-3 w-25"
                onClick={() => history.push(`/users/${userId}`)}
            >
                    Назад
            </button>
            <div className="col-md-6 offset-3 shadow p-4">
                <h3 className="mb-4">Изменение данных</h3>
                <EditorPage
                    user={user}
                />
            </div>
        </ContainerWrapper>
    ) : (
        <Redirect to={`/users/${currentUser._id}/edit`}/>
    ) : (
        <ContainerWrapper
            containerClass="container"
            rowClass="row gutters-sm"
        >
            <h3 className="mb-4">Страница пользователя</h3>
            <UserPage
                user={user}
                id={userId}
            />
        </ContainerWrapper>
    ) : (
        <UsersListPage/>
    );
};

export default Users;
