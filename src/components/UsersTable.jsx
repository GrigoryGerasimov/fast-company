import React from "react";
import { Bookmark } from "./Bookmark";
import { QualitiesList } from "./QualitiesList.jsx";
import { Table } from "./Table.jsx";
import PropTypes from "prop-types";

export const UsersTable = ({ users, onSort, selectedSort, onBookmarkToggle, onDelete }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => (
                <QualitiesList qualities={user.qualities}/>
            )
        },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    _id={user._id}
                    bookmark={user.bookmark}
                    onBookmarkToggle={onBookmarkToggle}
                />
            )
        },
        delete: {
            component: (user) => (
                <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
                        delete
                </button>
            )
        }
    };

    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />
    );
};

UsersTable.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onBookmarkToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
