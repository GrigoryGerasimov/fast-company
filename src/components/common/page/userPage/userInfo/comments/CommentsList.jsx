import React, { useState, useEffect, useCallback } from "react";
import API from "../../../../../../api";
import { Comment, NewComment } from "./index";
import PropTypes from "prop-types";

const CommentsList = ({ id, userComments }) => {
    const [users, setUsers] = useState([]);

    const handleRequest = useCallback(() => {
        API.users.fetchAll().then(userData => {
            const selectedUserInfo = userData.map(data => ({
                value: data._id,
                label: data.name
            }));
            setUsers(selectedUserInfo);
        });
    }, []);

    useEffect(() => {
        handleRequest();
    }, [handleRequest]);

    const handleCommentAdd = useCallback(data => API.comments.add(data).then(response => console.log(response)), []);
    const handleCommentDelete = useCallback(id => API.comments.remove(id).then(response => console.log(response)), []);

    return (
        <>
            <div className="card mb-2">{" "}
                <div className="card-body ">
                    <h2>New comment</h2>
                    <NewComment currentUserId={id} users={users} onCommentAdd={handleCommentAdd}/>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body">
                    <h2>Comments</h2>
                    <hr/>
                    {Array.isArray(userComments) ? userComments.map(comment => {
                        const sender = users.find(user => user.value === comment.userId);
                        return sender?.value && (<Comment
                            key={comment._id}
                            {...comment}
                            sender={sender.label}
                            onCommentDelete={handleCommentDelete}
                        />);
                    }) : Object.keys(userComments).map(comment => {
                        const sender = users.find(user => user.value === userComments[comment].userId);
                        return sender?.value && (<Comment
                            key={userComments[comment]._id}
                            {...userComments[comment]}
                            sender={sender.label}
                            onCommentDelete={handleCommentDelete}
                        />);
                    })}
                </div>
            </div>
        </>
    );
};

export default CommentsList;

CommentsList.propTypes = {
    id: PropTypes.string,
    userComments: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object])
};
