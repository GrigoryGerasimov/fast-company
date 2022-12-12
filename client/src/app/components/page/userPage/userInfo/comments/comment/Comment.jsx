import React from "react";
import { UserComment } from "../UserComment.jsx";
import { CardWrapper } from "../../../../../common/wrappers";
import PropTypes from "prop-types";

const Comment = ({
    _id,
    createdAt: timestamp,
    content,
    senderId,
    currentUser,
    onCommentDelete
}) => {
    return (
        <CardWrapper>
            <UserComment
                id={_id}
                senderId={senderId}
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
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    senderId: PropTypes.string,
    currentUser: PropTypes.object,
    onCommentDelete: PropTypes.func
};
