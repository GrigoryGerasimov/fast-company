import React from "react";
import { Outlet } from "react-router-dom";
import { ContainerWrapper } from "../../../wrappers";

export const UserInfoPage = () => {
    return (
        <ContainerWrapper>
            <Outlet/>
        </ContainerWrapper>
    );
};
