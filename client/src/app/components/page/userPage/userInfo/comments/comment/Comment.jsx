import React from "react";
import { UserComment } from "../UserComment.jsx";
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
        <div className="card mb-3">
            <div className="card-body bg-light">
                <div className="row">
                    <div className="col">
                        <UserComment
                            id={_id}
                            senderId={senderId}
                            currentUser={currentUser}
                            timestamp={timestamp}
                            content={content}
                            onCommentDelete={onCommentDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
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
