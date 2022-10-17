import React from "react";
import { UserComment } from "../UserComment.jsx";
import { CardWrapper } from "../../../../../wrappers";
import PropTypes from "prop-types";

const Comment = ({
    _id,
    created_at: timestamp,
    content,
    sender,
    currentUser,
    onCommentDelete
}) => {
    return (
        <CardWrapper>
            <UserComment
                id={_id}
                sender={sender}
                currentUser={currentUser}
                timestamp={timestamp}
                content={content}
                onCommentDelete={onCommentDelete}
            />
        </CardWrapper>
    );
};

export default Comment;

Comment.propTypes = {
    _id: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sender: PropTypes.object,
    currentUser: PropTypes.object,
    onCommentDelete: PropTypes.func
};
