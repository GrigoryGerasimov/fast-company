import React from "react";
import PropTypes from "prop-types";

export const Bookmark = ({ _id, bookmarkedIds, onBookmarkToggle }) => {
    return (
        <button onClick={() => onBookmarkToggle(_id)}>
            {!bookmarkedIds || bookmarkedIds.indexOf(_id) === -1 ? (
                <i className="bi bi-bookmark"></i>
            ) : (
                <i className="bi bi-bookmark-fill"></i>
            )}
        </button>
    );
};

Bookmark.propTypes = {
    _id: PropTypes.string.isRequired,
    bookmarkedIds: PropTypes.array,
    onBookmarkToggle: PropTypes.func.isRequired
};
