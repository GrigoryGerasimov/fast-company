import React from "react";
import { Bookmark } from "../common/Bookmark";
import { Qualities } from "./qualities";
import { Table } from "../common/table";
import { UserName } from "../common/UserName.jsx";
import PropTypes from "prop-types";

export const UsersTable = ({ users, onSort, selectedSort, onBookmarkToggle, onDelete }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <UserName name={user.name} id={user._id} />
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => (
                <Qualities qualities={user.qualities}/>
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
