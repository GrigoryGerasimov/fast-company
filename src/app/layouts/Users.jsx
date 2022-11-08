import React from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { UserPage, EditorPage } from "../components/common/page/userPage";
import { UsersListPage } from "../components/common/page/userListPage";
import { ContainerWrapper } from "../components/common/wrappers";
import { useSelector } from "react-redux";
import { getUserById, getCurrentUserId, getCurrentUser } from "../store/users.js";

const Users = () => {
    const { userId, edit } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const currentUser = useSelector(getCurrentUser());
    const userById = useSelector(getUserById(userId));
    const user = currentUserId === userId ? currentUser : userById;
    const history = useHistory();

    return userId ? edit ? userId === currentUserId ? (
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
        <Redirect to={`/users/${currentUserId}/edit`}/>
    ) : (
        <ContainerWrapper>
            <UserPage user={user} id={userId}/>
        </ContainerWrapper>
    ) : (
        <UsersListPage/>
    );
};

export default Users;
