import React from "react";
import { UserPic } from "../UserPic";
import { UserCommentBody } from "./comment/UserCommentBody";
import { useSelector } from "react-redux";
import { getUserById } from "../../../../../../store/users.js";
import PropTypes from "prop-types";

export const UserComment = ({ id, senderId, currentUser, timestamp, content, onCommentDelete }) => {
    const sender = useSelector(getUserById(senderId)) ?? currentUser;
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
    senderId: PropTypes.string,
    currentUser: PropTypes.object,
    timestamp: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    content: PropTypes.string,
    onCommentDelete: PropTypes.func
};
