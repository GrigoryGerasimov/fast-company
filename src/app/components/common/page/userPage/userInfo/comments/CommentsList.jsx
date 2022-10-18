import React, { useCallback } from "react";
import { NewComment } from "./index";
import { useComments } from "../../../../../../hooks";
import { CardWrapper, Divider } from "../../../../wrappers";
import { Comments } from "./Comments.jsx";

const CommentsList = () => {
    const { comments, createComment, deleteComment } = useComments();

    const handleCommentAdd = useCallback(data => createComment(data), []);
    const handleCommentDelete = useCallback(commentId => deleteComment(commentId), []);

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
