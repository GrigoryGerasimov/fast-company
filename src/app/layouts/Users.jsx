import React from "react";
import { Outlet } from "react-router-dom";
import { ContainerWrapper } from "../components/common/wrappers";

const Users = () => {
    return (
        <ContainerWrapper>
            <Outlet/>
        </ContainerWrapper>
    );
    // userId ? edit ? userId === currentUserId ? (
    //     <ContainerWrapper>
    //         <EditorPage user={user} />
    //     </ContainerWrapper>
    // ) : (
    //     <Redirect to={`/users/${currentUserId}/edit`}/>
    // ) : (
    //     <ContainerWrapper>
    //         <UserPage user={user}/>
    //     </ContainerWrapper>
    // ) : (
    //     <UsersListPage/>
    // );
};

export default Users;
