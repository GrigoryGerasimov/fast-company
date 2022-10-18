import React from "react";
import PropTypes from "prop-types";
import { useProfessions } from "../../hooks";
import Loader from "../common/Loader.jsx";

export const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const profession = getProfession(id);
    return !isLoading ? (<p>{profession.name}</p>) : <Loader/>;
};

Profession.propTypes = {
    id: PropTypes.string
};
