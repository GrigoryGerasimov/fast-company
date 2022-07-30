import React, { useState, useEffect } from "react";
import { User } from "./User.jsx";
import { Pagination } from "./Pagination.jsx";
import { paginate } from "../utils/paginate.js";
import { GroupList } from "./GroupList.jsx";
import PropTypes from "prop-types";
import api from "../api/index.js";
import { SearchStatus } from "./SearchStatus";
import getPagesRange from "../utils/getPagesRange.js";

export const Users = ({ users: allUsers, ...rest }) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState([]);
    const [selectedProf, setSelectedProf] = useState();
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    const filteredUsers = selectedProf ? allUsers.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) : allUsers;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const clearFilter = () => {
        setSelectedProf();
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    useEffect(() => {
        const [, pages] = getPagesRange(count, pageSize);
        setCurrentPage(prevState => prevState === 1 ? prevState : pages.length);
    }, [!userCrop.length]);

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-warning mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count ? (
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User key={user._id} {...user} {...rest} />
                            ))}
                        </tbody>
                    </table>
                ) : null}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    rest: PropTypes.any
};
