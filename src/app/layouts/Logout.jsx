import React, { useEffect } from "react";
import Loader from "../components/common/Loader.jsx";
import { useAuth } from "../hooks";

const Logout = () => {
    const { signOut } = useAuth();

    useEffect(() => {
        signOut();
    }, []);

    return <Loader/>;
};

export default Logout;
