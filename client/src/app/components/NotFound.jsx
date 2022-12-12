import React from "react";
import { useNavigate } from "react-router-dom";
import { ContainerWrapper } from "./common/wrappers";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <ContainerWrapper>
            <h1>Page Not Found</h1>
            <button
                className="btn btn-primary w-25 mt-5"
                onClick={() => navigate("/", { replace: true })}>
                Back to Home Page
            </button>
        </ContainerWrapper>
    );
};

export default NotFound;
