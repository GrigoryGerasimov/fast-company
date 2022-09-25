import React from "react";
import PropTypes from "prop-types";

const ContainerWrapper = ({ containerClass, rowClass, children }) => {
    return (
        <div className={containerClass}>
            <div className={rowClass}>{children}</div>
        </div>
    );
};

export default ContainerWrapper;

ContainerWrapper.defaultProps = {
    containerClass: "container mt-5",
    rowClass: "row"
};

ContainerWrapper.propTypes = {
    containerClass: PropTypes.string.isRequired,
    rowClass: PropTypes.string.isRequired,
    children: PropTypes.any
};
