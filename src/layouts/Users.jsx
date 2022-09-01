import React, { useState, useEffect } from "react";
import { UsersTable } from "../components/UsersTable.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { paginate } from "../utils/paginate.js";
import { GroupList } from "../components/GroupList.jsx";
import PropTypes from "prop-types";
import api from "../api";
import { SearchStatus } from "../components/SearchStatus.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import getPagesRange from "../utils/getPagesRange.js";
import _ from "lodash";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((response) => setUsers(response));
    }, []);

    const handleDelete = (userId) =>
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    const handleToggleBookmark = (userId) => {
        const currentUserIndex = users.findIndex((user) => user._id === userId);
        const updatedUsers = [...users];
        updatedUsers[currentUserIndex].bookmark =
            !updatedUsers[currentUserIndex].bookmark;
        setUsers(updatedUsers);
    };

    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState([]);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);

    const [searchValue, setSearchValue] = useState("");
    const handleResetSearch = () => {
        setSearchValue("");
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        handleResetSearch();
    };
    const clearFilter = () => {
        setSelectedProf();
        handleResetSearch();
    };
    const handleSearch = ({ target }) => {
        const { value } = target;
        clearFilter();
        setSearchValue(value);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const updatedUsers = users.filter((user) => selectedProf ? JSON.stringify(user.profession) === JSON.stringify(selectedProf) : searchValue ? user.name.toLowerCase().includes(searchValue.toLowerCase()) : user);

    const sortedUsers = _.orderBy(updatedUsers, [sortBy.path], [sortBy.order]);
    const count = updatedUsers.length;
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    useEffect(() => {
        const [, pages] = getPagesRange(count, pageSize);
        setCurrentPage((prevState) =>
            prevState === 1 ? prevState : pages.length
        );
    }, [!userCrop.length]);

    if (users.length) {
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
                    <SearchStatus length={count}/>
                    <SearchBar value={searchValue} onSearch={handleSearch} />
                    {count ? <UsersTable users={userCrop} onSort={handleSort} selectedSort={sortBy} onDelete={handleDelete} onBookmarkToggle={handleToggleBookmark}/> : null}
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
    } else return "loading...";
};

export default Users;

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};
