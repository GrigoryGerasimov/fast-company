import React from "react";
import PropTypes from "prop-types";

export const UserPic = React.memo(({ source, className, alt, width, height }) => {
    return (
        <img
            src={source}
            className={className}
            alt={alt}
            width={width}
            height={height}
        />
    );
});

UserPic.defaultProps = {
    alt: "avatar"
};

UserPic.propTypes = {
    source: PropTypes.string,
    className: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};
