import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const UserName = ({ name, id }) => (
    <Link to={`/users/${id}`}>{name}</Link>
);

UserName.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string
};
