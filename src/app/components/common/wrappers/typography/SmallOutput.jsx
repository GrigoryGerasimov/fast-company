import React from "react";
import PropTypes from "prop-types";

const SmallOutput = ({ children }) => {
    return <span className="small">{children}</span>;
};

export default SmallOutput;

SmallOutput.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
