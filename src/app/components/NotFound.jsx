import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1>Oops! Page Not Found</h1>
            <button
                className="btn btn-primary w-25 mt-5"
                onClick={() => navigate("/", { replace: true })}>
                Back to Home Page
            </button>
        </>
    );
};

export default NotFound;
