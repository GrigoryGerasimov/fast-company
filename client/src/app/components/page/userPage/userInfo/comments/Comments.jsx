import React from "react";
import { Comment } from "./index";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../../../store/users.js";
import PropTypes from "prop-types";

export const Comments = ({ comments, onCommentDelete }) => {
    const currentUser = useSelector(getCurrentUser());

    return comments.map((comment) => {
        return (
            <Comment
                key={comment._id}
                {...comment}
                senderId={comment.userId}
                currentUser={currentUser}
                onCommentDelete={onCommentDelete}
            />
        );
    }
    );
};

Comments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    onCommentDelete: PropTypes.func
};
