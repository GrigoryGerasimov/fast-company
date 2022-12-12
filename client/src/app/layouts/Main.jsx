import React from "react";
import { ContainerWrapper } from "../components/common/wrappers";
import { FirebaseDataInitializer } from "../components/FirebaseDataInitializer.jsx";

const Main = () => {
    return (
        <ContainerWrapper>
            <FirebaseDataInitializer/>
        </ContainerWrapper>
    );
};

export default Main;
