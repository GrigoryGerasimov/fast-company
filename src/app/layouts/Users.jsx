import React from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { UserPage, EditorPage } from "../components/common/page/userPage";
import { UsersListPage } from "../components/common/page/userListPage";
import { ContainerWrapper } from "../components/common/wrappers";
import { useUsers, useAuth } from "../hooks";

const Users = () => {
    const { userId, edit } = useParams();
    const { currentUser } = useAuth();
    const { getUserById } = useUsers();
    const user = currentUser._id === userId ? currentUser : getUserById(userId);
    const history = useHistory();

    return userId ? edit ? userId === currentUser._id ? (
        <>
            <button
                className="btn btn-primary offset-1 m-3 w-25"
                onClick={() => history.push(`/users/${userId}`)}
            >
                Назад
            </button>
            <ContainerWrapper>
                <EditorPage user={user}/>
            </ContainerWrapper>
        </>
    ) : (
        <Redirect to={`/users/${currentUser._id}/edit`}/>
    ) : (
        <ContainerWrapper>
            <UserPage user={user} id={userId}/>
        </ContainerWrapper>
    ) : (
        <UsersListPage/>
    );
};

export default Users;
