import React from "react";
import PropTypes from "prop-types";

export const Quality = ({ color, name }) => (
    <td className={`quality badge bg-${color} m-1`}>{name}</td>
);

Quality.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
