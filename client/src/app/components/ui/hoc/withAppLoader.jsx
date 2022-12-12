import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadQualitiesList } from "../../../store/qualities.js";
import { loadProfessionsList } from "../../../store/professions.js";
import { loadUsersList, getUserLoggedInStatus, getUsersLoadingStatus } from "../../../store/users.js";
import Loader from "../../common/Loader";

const withAppLoader = Component => props => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getUserLoggedInStatus());
    const userStatusIsLoading = useSelector(getUsersLoadingStatus());

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        if (isLoggedIn) dispatch(loadUsersList());
    }, [isLoggedIn]);

    return !userStatusIsLoading ? <Component {...props}/> : <Loader/>;
};

export default withAppLoader;
