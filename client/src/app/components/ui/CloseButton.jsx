import React from "react";
import PropTypes from "prop-types";

export const CloseButton = ({ onClick }) => {
    return (
        <button
            className="btn btn-sm text-primary d-flex align-items-center"
            onClick={onClick}
        >
            <i className="bi bi-x-lg"></i>
        </button>
    );
};

CloseButton.propTypes = {
    onClick: PropTypes.func
};
