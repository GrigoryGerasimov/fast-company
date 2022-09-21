import React from "react";
import PropTypes from "prop-types";
import { getTimestampFormat } from "../../../../../../utils/timestamp/getTimestampFormat";

const CommentTimestamp = ({ timestamp }) => {
    return <span className="small">- {getTimestampFormat(timestamp)}</span>;
};

export default CommentTimestamp;

CommentTimestamp.propTypes = {
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
