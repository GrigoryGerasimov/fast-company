import React from "react";
import { UserName } from "../../../../../UserName";
import { CommentTimestamp } from "../index";
import { CloseButton } from "../../../../../../ui/CloseButton";
import PropTypes from "prop-types";

export const CommentHeader = ({ id, sender, currentUser, timestamp, onCommentDelete }) => {
    return (
        <div className="d-flex justify-content-between align-items-center">
            <p className="mb-1 ">
                <UserName name={sender.name} id={sender._id}/>
                <CommentTimestamp
                    timestamp={timestamp}
                />
            </p>
            {sender === currentUser && (
                <CloseButton onClick={() => onCommentDelete(id)}/>
            )}
        </div>
    );
};

CommentHeader.propTypes = {
    id: PropTypes.string,
    sender: PropTypes.object,
    currentUser: PropTypes.object,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onCommentDelete: PropTypes.func
};
