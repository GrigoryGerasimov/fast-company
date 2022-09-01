import React from "react";
import { Quality } from "./Quality";
import PropTypes from "prop-types";

export const QualitiesList = ({ qualities }) => {
    return (
        <table className="table mb-0 align-middle">
            <tbody>
                <tr>
                    {qualities.map((quality) => (
                        <Quality key={quality._id} {...quality} />
                    ))}
                </tr>
            </tbody>
        </table>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
