import React from "react";
import PropTypes from "prop-types";

const ContainerWrapper = ({ title, children }) => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-3 shadow p-4">
                    <h3 className="mb-4">{title}</h3>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ContainerWrapper;

ContainerWrapper.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any
};
