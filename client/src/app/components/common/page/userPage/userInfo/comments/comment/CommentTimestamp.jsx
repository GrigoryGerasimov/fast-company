import React from "react";
import { getTimestampFormat } from "../../../../../../../utils/timestamp/getTimestampFormat";
import SmallOutput from "../../../../../wrappers/typography/SmallOutput.jsx";
import PropTypes from "prop-types";

const CommentTimestamp = ({ timestamp }) => {
    return <SmallOutput> - {getTimestampFormat(timestamp)}</SmallOutput>;
};

export default CommentTimestamp;

CommentTimestamp.propTypes = {
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
};
