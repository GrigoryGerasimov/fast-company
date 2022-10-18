import React from "react";
import { ContainerWrapper } from "../components/common/wrappers";
import { FirebaseDataInitializer } from "../components/FirebaseDataInitializer.jsx";

const Main = () => {
    return (
        <>
            <h1>Main Page</h1>
            <ContainerWrapper>
                <FirebaseDataInitializer/>
            </ContainerWrapper>
        </>
    );
};

export default Main;
