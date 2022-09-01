import React from "react";
import PropTypes from "prop-types";
import { QualitiesList } from "./QualitiesList.jsx";
import { useHistory } from "react-router-dom";

export const UserPage = ({ user }) => {
    const history = useHistory();

    const handleBackmove = () => user ? history.push("/users") : history.replace("/users");

    return user?._id ? (
        <>
            <ul className="list-group">
                <li className="list-group-item">{user.name}</li>
                <li className="list-group-item">Профессия: {user.profession.name}</li>
                <li className="list-group-item"><QualitiesList qualities={user.qualities}/></li>
                <li className="list-group-item">Количество встреч: {user.completedMeetings}</li>
                <li className="list-group-item">Оценка: {user.rate}</li>
            </ul>
            <button type="button" onClick={handleBackmove}>Все пользователи</button>
        </>
    ) : <h1>Loading</h1>;
};

UserPage.propTypes = {
    user: PropTypes.object,
    name: PropTypes.string,
    profession: PropTypes.object,
    qualities: PropTypes.array,
    completedMeetings: PropTypes.number,
    rate: PropTypes.number
};
