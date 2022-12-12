import React from "react";
import PropTypes from "prop-types";

export const Meetings = ({ info }) => {
    return <h1 className="display-1">{info}</h1>;
};

Meetings.propTypes = {
    info: PropTypes.number
};
