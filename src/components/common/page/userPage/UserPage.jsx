import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { UserInfoCard, UserQualitiesCard, UserMeetingsCard, CommentsList } from "./userInfo";

export const UserPage = ({ user, id, userComments }) => {
    const history = useHistory();

    return user?._id ? (
        <>
            <div className="col-md-4 mb-3">
                <UserInfoCard
                    id={id}
                    name={user.name}
                    profession={user.profession.name}
                    rate={user.rate}
                />
                <UserQualitiesCard qualities={user.qualities}/>
                <UserMeetingsCard meetings={user.completedMeetings}/>
                <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={() => user ? history.push("/users") : history.replace("/users")}>
                    Все пользователи
                </button>
            </div>

            <div className="col-md-8">
                <CommentsList id={id} userComments={userComments}/>
            </div>

        </>
    ) : <h1>Loading</h1>;
};

UserPage.propTypes = {
    id: PropTypes.string,
    user: PropTypes.object,
    userComments: PropTypes.arrayOf(PropTypes.object)
};
