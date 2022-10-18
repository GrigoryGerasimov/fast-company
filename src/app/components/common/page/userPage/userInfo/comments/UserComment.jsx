import React from "react";
import { UserPic } from "../UserPic";
import { UserCommentBody } from "./comment/UserCommentBody";
import PropTypes from "prop-types";

export const UserComment = ({ id, sender, currentUser, timestamp, content, onCommentDelete }) => {
    return (
        <div className="d-flex flex-start">
            <UserPic
                source={sender.image}
                className="rounded-circle shadow-1-strong me-3"
                width="65"
                height="65"
            />
            <UserCommentBody
                id={id}
                sender={sender}
                currentUser={currentUser}
                timestamp={timestamp}
                content={content}
                onCommentDelete={onCommentDelete}
            />
        </div>
    );
};

UserComment.propTypes = {
    id: PropTypes.string,
    sender: PropTypes.object,
    currentUser: PropTypes.object,
    timestamp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    content: PropTypes.string,
    onCommentDelete: PropTypes.func
};
