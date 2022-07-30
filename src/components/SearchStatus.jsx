import React from "react";
import PropTypes from "prop-types";

export const SearchStatus = ({ length }) =>
    !length ? (
        <div className="info-phrase badge bg-danger">
            Никто с тобой не тусанёт
        </div>
    ) : (
        <div className="info-phrase badge bg-primary">
            {length} {length > 1 && length < 5 ? "человека" : "человек"} тусанёт
            с тобой сегодня
        </div>
    );

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
