import React from "react";
import { UserPic, CommentTimestamp } from "../index";
import PropTypes from "prop-types";

const Comment = ({
    _id,
    created_at: timestamp,
    content,
    sender,
    onCommentDelete
}) => {
    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <UserPic
                            className="rounded-circle shadow-1-strong me-3"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {sender}{" "}
                                        <CommentTimestamp
                                            timestamp={timestamp}
                                        />
                                    </p>
                                    <button
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={() => onCommentDelete(_id)}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Comment);

Comment.propTypes = {
    _id: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sender: PropTypes.string,
    onCommentDelete: PropTypes.func
};
