import React, { useEffect } from "react";
import { Quality } from "./Quality";
import { useSelector, useDispatch } from "react-redux";
import { getQualitiesLoadingStatus, getQualitiesByIds, loadQualitiesList } from "../../../store/qualities.js";
import PropTypes from "prop-types";
import Loader from "../../common/Loader.jsx";

const QualitiesList = ({ idData }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesByUser = useSelector(getQualitiesByIds(idData));

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    return !isLoading ? qualitiesByUser.map((quality) => (
        <Quality key={quality._id} {...quality} />
    )) : <Loader/>;
};

export default QualitiesList;

QualitiesList.propTypes = {
    idData: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string])
};
