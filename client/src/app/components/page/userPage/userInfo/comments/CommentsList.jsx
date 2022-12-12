import React from "react";
import { useParams } from "react-router-dom";
import { NewComment } from "./index";
import { Divider } from "../../../../common/wrappers";
import { Comments } from "./Comments.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getComments, createComment, deleteComment, getCommentsLoadingStatus } from "../../../../../store/comments.js";
import { getCurrentUserId } from "../../../../../store/users.js";
import Loader from "../../../../common/Loader.jsx";

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
            <div className="card mb-2">
                <div className="card-body">
                    <h2>New comment</h2>
                    <NewComment onCommentAdd={handleCommentAdd}/>
                </div>
            </div>
            <Divider/>
            <div className="card mb-3">
                <div className="card-body">
                    <h2>Comments</h2>
                    <Comments comments={comments} onCommentDelete={handleCommentDelete}/>
                </div>
            </div>
        </>
    );
};

export default CommentsList;
