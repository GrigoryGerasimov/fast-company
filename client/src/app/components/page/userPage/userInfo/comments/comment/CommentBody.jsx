import React from "react";
import { SmallText } from "../../../../../common/wrappers";
import PropTypes from "prop-types";

export const CommentBody = ({ content }) => {
    return <SmallText textClass="mb-0">{content}</SmallText>;
};

CommentBody.propTypes = {
    content: PropTypes.string
};
