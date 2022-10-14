import React from "react";
import { useParams } from "react-router-dom";
import { Comment, NewComment } from "./index";
import { useUsers, useComments, useAuth } from "../../../../../../hooks";

const CommentsList = () => {
    const { userId } = useParams();
    const { getUserById } = useUsers();
    const { currentUser } = useAuth();
    const { comments, createComment, deleteComment } = useComments();

    const handleCommentAdd = data => createComment(data);
    const handleCommentDelete = commentId => deleteComment(commentId);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <h2>New comment</h2>
                    <NewComment
                        onCommentAdd={handleCommentAdd}
                    />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    {comments.map((comment) => {
                        const sender = getUserById(comment.userId) ?? currentUser;
                        return (
                            <Comment
                                key={comment._id}
                                {...comment}
                                sender={sender}
                                currentUser={currentUser}
                                onCommentDelete={handleCommentDelete}
                            />
                        );
                    }
                    )}
                </div>
            </div>
        </>
    );
};

export default CommentsList;
