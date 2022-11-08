import React, { useState, useEffect } from "react";
import { UsersTable } from "../../../ui/UsersTable.jsx";
import { Pagination } from "../../Pagination.jsx";
import { paginate, getPagesRange } from "../../../../utils/pagination/paginate.js";
import { GroupList } from "../../GroupList.jsx";
import PropTypes from "prop-types";
import { SearchStatus } from "../../../ui/SearchStatus.jsx";
import { SearchBar } from "../../../ui/SearchBar.jsx";
import _ from "lodash";
import { toast } from "react-toastify";
import Loader from "../../Loader.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus } from "../../../../store/professions.js";
import { getUsers, deleteUser, updateUser, getDataStatus } from "../../../../store/users.js";

export const UsersListPage = () => {
    const users = useSelector(getUsers());
    const dataStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();

    if (!dataStatus) return <Loader/>;

    const handleDelete = async userId => {
        try {
            dispatch(deleteUser(userId));
        } catch (error) {
            toast.error(error);
        }
    };

    const handleToggleBookmark = userId => {
        const updatedUser = users.find(user => user._id === userId);
        dispatch(updateUser(userId, {
            ...updatedUser,
            bookmark: !updatedUser.bookmark
        }));
    };

    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
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
        setCurrentPage(1);
    }, [selectedProf]);

    const updatedUsers = users.filter((user) => {
        return selectedProf ? user.profession === selectedProf : searchValue ? user.name.toLowerCase().includes(searchValue.toLowerCase()) : user;
    });

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
                {(professions && !professionsLoading) && (
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
                    <SearchBar value={searchValue} onSearch={handleSearch} />
                    {count ? (
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onBookmarkToggle={handleToggleBookmark}
                        />
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
    } else return <Loader/>;
};

UsersListPage.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};
