import React from "react";
import PropTypes from "prop-types";
import { Qualities } from "../../../ui/qualities";
import { useHistory, Link } from "react-router-dom";

export const UserPage = ({ user, id }) => {
    const history = useHistory();

    const handleMoveBackwards = () => user ? history.push("/users") : history.replace("/users");

    return user?._id ? (
        <>
            <ul className="list-group">
                <li className="list-group-item">Имя: {user.name}</li>
                <li className="list-group-item">Контакт: {user.email}</li>
                <li className="list-group-item">Пол: {user.sex === "male" ? "Мужской" : user.sex === "female" ? "Женский" : "Другой"}</li>
                <li className="list-group-item">Профессия: {user.profession.name}</li>
                <li className="list-group-item"><Qualities qualities={user.qualities}/></li>
                <li className="list-group-item">Количество встреч: {user.completedMeetings}</li>
                <li className="list-group-item">Оценка: {user.rate}</li>
            </ul>
            <div className="btn-group w-100 mt-4">
                <button type="button" className="btn btn-primary w-50" onClick={handleMoveBackwards}>Все пользователи</button>
                <button type="button" className="btn btn-outline-primary w-50">
                    <Link to={`/users/${id}/edit`}>
                        Изменить пользователя
                    </Link>
                </button>
            </div>
        </>
    ) : <h1>Loading</h1>;
};

UserPage.propTypes = {
    id: PropTypes.string,
    user: PropTypes.object
};
