import React, { useEffect } from "react";
import Loader from "../components/common/Loader.jsx";
import { useDispatch } from "react-redux";
import { signOut } from "../store/users.js";

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(signOut());
    }, []);

    return <Loader/>;
};

export default Logout;
