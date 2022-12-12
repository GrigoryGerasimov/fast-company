import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    UserInfoCard,
    UserQualitiesCard,
    UserMeetingsCard,
    CommentsList
} from "./userInfo";
import Loader from "../../common/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadCommentsList, getDeletedCommentId } from "../../../store/comments.js";
import { getCurrentUser, getCurrentUserId, getUserById } from "../../../store/users";

export const UserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deletedCommentId = useSelector(getDeletedCommentId());
    const currentUserId = useSelector(getCurrentUserId());
    const currentUser = useSelector(getCurrentUser());
    const userById = useSelector(getUserById(userId));
    const user = currentUserId === userId ? currentUser : userById;

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId, deletedCommentId]);

    return user?._id ? (
        <>
            <div className="col-md-4 mb-3">
                <UserInfoCard
                    id={userId}
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
                    onClick={() => navigate("/users")}
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
