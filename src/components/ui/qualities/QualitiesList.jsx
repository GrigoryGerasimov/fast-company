import React from "react";
import { Quality } from "./Quality";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality._id} {...quality} />
            ))}
        </>
    );
};

export default QualitiesList;

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
