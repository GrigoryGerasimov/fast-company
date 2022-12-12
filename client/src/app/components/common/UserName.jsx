import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const UserName = ({ name, id }) => (
    <Link to={`/users/${id}`} className="text-dark" style={{ textDecoration: "none" }}>
        <strong>{name}</strong>
    </Link>
);

UserName.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string
};
