import React from "react";
import { CommentHeader } from "./CommentHeader";
import { CommentBody } from "./CommentBody";
import PropTypes from "prop-types";

export const UserCommentBody = ({ id, sender, currentUser, timestamp, content, onCommentDelete }) => {
    return (
        <div className="flex-grow-1 flex-shrink-1">
            <div className="mb-4">
                <CommentHeader
                    id={id}
                    sender={sender}
                    currentUser={currentUser}
                    timestamp={timestamp}
                    onCommentDelete={onCommentDelete}
                />
                <CommentBody content={content}/>
            </div>
        </div>
    );
};

UserCommentBody.propTypes = {
    id: PropTypes.string,
    sender: PropTypes.object,
    currentUser: PropTypes.object,
    timestamp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    content: PropTypes.string,
    onCommentDelete: PropTypes.func
};
