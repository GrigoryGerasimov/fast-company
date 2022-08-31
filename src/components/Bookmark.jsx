import React from "react";
import PropTypes from "prop-types";

export const Bookmark = ({ _id, bookmark, onBookmarkToggle }) => (
    <table className="table mb-0 align-middle">
        <tbody>
            <tr>
                <td onClick={() => onBookmarkToggle(_id)}>
                    {!bookmark ? (
                        <i className="bi bi-bookmark"></i>
                    ) : (
                        <i className="bi bi-bookmark-fill"></i>
                    )}
                </td>
            </tr>
        </tbody>
    </table>
);

Bookmark.propTypes = {
    _id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onBookmarkToggle: PropTypes.func.isRequired
};
