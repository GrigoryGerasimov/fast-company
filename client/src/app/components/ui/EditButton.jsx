import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const EditButton = ({ id }) => {
    return (
        <Link to={`/users/${id}/edit`}>
            <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                <i className="bi bi-gear"></i>
            </button>
        </Link>
    );
};

EditButton.propTypes = {
    id: PropTypes.string
};
