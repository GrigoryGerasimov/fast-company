import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader.jsx";
import { useDispatch } from "react-redux";
import { signOut } from "../store/users.js";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(signOut());
        navigate("/login/signin");
    }, []);

    return <Loader/>;
};

export default Logout;
