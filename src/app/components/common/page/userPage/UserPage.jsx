import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    UserInfoCard,
    UserQualitiesCard,
    UserMeetingsCard,
    CommentsList
} from "./userInfo";
import Loader from "../../Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadCommentsList, getDeletedCommentId } from "../../../../store/comments.js";
import PropTypes from "prop-types";

export const UserPage = ({ user, id }) => {
    const { userId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const deletedCommentId = useSelector(getDeletedCommentId());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId, deletedCommentId]);

    return user?._id ? (
        <>
            <div className="col-md-4 mb-3">
                <UserInfoCard
                    id={id}
                    imgSource={user.image}
                    name={user.name}
                    profession={user.profession}
                    rate={user.rate}
                />
                <UserQualitiesCard qualities={user.qualities}/>
                <UserMeetingsCard meetings={user.completedMeetings}/>
                <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={() => user ? history.push("/users") : history.replace("/users")}
                >
                    Все пользователи
                </button>
            </div>
            <div className="col-md-8">
                <CommentsList/>
            </div>
        </>
    ) : (
        <Loader/>
    );
};

UserPage.propTypes = {
    id: PropTypes.string,
    user: PropTypes.object
};
