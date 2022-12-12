import React from "react";
import PropTypes from "prop-types";

const SmallText = ({ textClass = "", children }) => {
    return <p className={`small ${textClass}`}>{children}</p>;
};

export default React.memo(SmallText);

SmallText.propTypes = {
    textClass: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
