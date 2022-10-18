import React from "react";
import { Quality } from "./Quality";
import { useQualities } from "../../../hooks";
import PropTypes from "prop-types";
import Loader from "../../common/Loader.jsx";

const QualitiesList = ({ idData }) => {
    const { isLoading, getQualitiesByUser } = useQualities();

    const qualitiesByUser = Array.isArray(idData) ? idData.map(id => getQualitiesByUser(id)).reduce((accArr, idArr) => [...accArr, ...idArr], []) : getQualitiesByUser(idData);

    return !isLoading ? qualitiesByUser.map((quality) => (
        <Quality key={quality._id} {...quality} />
    )) : <Loader/>;
};

export default QualitiesList;

QualitiesList.propTypes = {
    idData: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string])
};
