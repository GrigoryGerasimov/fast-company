import React from "react";
import { Comment } from "./index";
import PropTypes from "prop-types";
import { useAuth, useUsers } from "../../../../../../hooks";

export const Comments = ({ comments, onCommentDelete }) => {
    const { getUserById } = useUsers();
    const { currentUser } = useAuth();

    return comments.map((comment) => {
        const sender = getUserById(comment.userId) ?? currentUser;
        return (
            <Comment
                key={comment._id}
                {...comment}
                sender={sender}
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
