import React from "react";
import { Outlet } from "react-router-dom";
import { ContainerWrapper } from "../components/common/wrappers";

const Users = () => {
    return (
        <ContainerWrapper>
            <Outlet/>
        </ContainerWrapper>
    );
};

export default Users;
