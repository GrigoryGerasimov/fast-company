import React from "react";
import PropTypes from "prop-types";
import Loader from "../common/Loader.jsx";
import { useSelector } from "react-redux";
import { getProfessionsLoadingStatus, getProfessionsById } from "../../store/professions.js";

export const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const profession = useSelector(getProfessionsById(id));
    return !isLoading ? (<p>{profession.name}</p>) : <Loader/>;
};

Profession.propTypes = {
    id: PropTypes.string
};
