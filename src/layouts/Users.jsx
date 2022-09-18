import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import API from "../api";
import { UserPage, EditorPage } from "../components/common/page/userPage";
import { UsersListPage } from "../components/common/page/userListPage";
import ContainerWrapper from "../components/ui/ContainerWrapper.jsx";

const Users = () => {
    const [user, setUser] = useState({});
    const { userId, edit } = useParams();
    const history = useHistory();
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [userComments, setUserComments] = useState([]);

    useEffect(() => {
        API.professions.fetchAll().then(response => {
            const professionsList = Object.keys(response).map(professionName => ({
                label: response[professionName].name,
                value: response[professionName]._id
            }));
            setProfessions(professionsList);
        });
        API.qualities.fetchAll().then(response => {
            const qualitiesList = Object.keys(response).map(qualityName => ({
                label: response[qualityName].name,
                value: response[qualityName]._id,
                color: response[qualityName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    useEffect(() => {
        API.users.getById(userId).then(userData => setUser(userData));
        API.comments.fetchCommentsForUser(userId).then(userComments => {
            const sortedComments = userComments.sort((commentA, commentB) => commentB.created_at - commentA.created_at);
            setUserComments(sortedComments);
        });
    });

    return userId ? edit ? (
        <>
            <button
                className="btn btn-primary offset-1 mt-3"
                onClick={() => history.push(`/users/${userId}`)}
            >
                Назад
            </button>
            <ContainerWrapper>
                <div className="col-md-6 offset-3 shadow p-4">
                    <h3 className="mb-4">Изменение данных</h3>
                    {user._id && <EditorPage user={{
                        ...user,
                        qualities: user.qualities.map(qualityName => ({
                            value: qualityName._id,
                            label: qualityName.name,
                            color: qualityName.color
                        }))
                    }} id={userId} qualities={qualities} professions={professions}/>}
                </div>
            </ContainerWrapper>
        </>
    ) : (
        <ContainerWrapper containerClass="container" rowClass="row gutters-sm">
            <h3 className="mb-4">Страница пользователя</h3>
            <UserPage user={user} id={userId} userComments={userComments}/>
        </ContainerWrapper>
    ) : <UsersListPage />;
};

export default Users;
