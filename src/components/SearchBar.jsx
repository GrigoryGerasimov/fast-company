import React from "react";
import PropTypes from "prop-types";

export const SearchBar = ({ value, onSearch }) => {
    return (
        <input
            type="text"
            id="searchbar"
            name="searchbar"
            placeholder="Search..."
            value={value}
            onChange={onSearch}
            className="my-1"
        />
    );
};

SearchBar.propTypes = {
    value: PropTypes.string,
    onSearch: PropTypes.func
};
