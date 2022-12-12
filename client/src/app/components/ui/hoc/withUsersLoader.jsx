import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsersList, getDeletedUserId } from "../../../store/users.js";
import Loader from "../../common/Loader.jsx";

const withUsersLoader = Component => props => {
    const dispatch = useDispatch();
    const dataStatus = useSelector(getDataStatus());
    const deletedUserId = useSelector(getDeletedUserId());

    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, [deletedUserId]);

    return dataStatus ? <Component {...props}/> : <Loader/>;
};

export default withUsersLoader;
