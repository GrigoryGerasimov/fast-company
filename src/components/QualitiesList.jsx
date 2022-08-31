import React from "react";
import { Quality } from "./Quality";
import PropTypes from "prop-types";

export const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality._id} {...quality} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
