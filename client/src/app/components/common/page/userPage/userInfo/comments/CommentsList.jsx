import React from "react";
import { useParams } from "react-router-dom";
import { NewComment } from "./index";
import { CardWrapper, Divider } from "../../../../wrappers";
import { Comments } from "./Comments.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getComments, createComment, deleteComment, getCommentsLoadingStatus } from "../../../../../../store/comments.js";
import { getCurrentUserId } from "../../../../../../store/users.js";
import Loader from "../../../../Loader.jsx";

const CommentsList = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const comments = useSelector(getComments());
    const currentUserId = useSelector(getCurrentUserId());
    const isLoading = useSelector(getCommentsLoadingStatus());

    if (isLoading) return <Loader/>;

    const handleCommentAdd = data => dispatch(createComment(userId, currentUserId, data));
    const handleCommentDelete = commentId => dispatch(deleteComment(commentId));

    return (
        <>
            <CardWrapper cardClass="mb-2">
                <NewComment onCommentAdd={handleCommentAdd}/>
            </CardWrapper>
            <Divider/>
            <CardWrapper>
                <Comments comments={comments} onCommentDelete={handleCommentDelete}/>
            </CardWrapper>
        </>
    );
};

export default CommentsList;
