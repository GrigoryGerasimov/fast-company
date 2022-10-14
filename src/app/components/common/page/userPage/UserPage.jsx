import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
    UserInfoCard,
    UserQualitiesCard,
    UserMeetingsCard,
    CommentsList
} from "./userInfo";
import Loader from "../../Loader.jsx";
import { CommentsProvider } from "../../../../hooks";

export const UserPage = ({ user, id }) => {
    const history = useHistory();

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
                <CommentsProvider>
                    <CommentsList/>
                </CommentsProvider>
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
