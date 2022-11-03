import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsersList } from "../../../store/users.js";
import Loader from "../../common/Loader.jsx";

const withUsersLoader = Component => props => {
    const dispatch = useDispatch();
    const dataStatus = useSelector(getDataStatus());

    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, []);

    return dataStatus ? <Component {...props}/> : <Loader/>;
};

export default withUsersLoader;
