import React from "react";
import PropTypes from "prop-types";

export const GroupList = ({
    items,
    valueProp,
    contentProp,
    onItemSelect,
    selectedItem
}) => {
    return (
        <ul className="list-group">
            {Array.isArray(items) ? items.map((item) => (
                <li
                    key={item[valueProp]}
                    className={`list-group-item ${
                        item === selectedItem ? "active" : ""
                    }`}
                    onClick={() => onItemSelect(item)}
                    role="button"
                >
                    {item[contentProp]}
                </li>
            )) : Object.keys(items).map((item) => (
                <li
                    key={items[item]?.[valueProp]}
                    className={`list-group-item ${
                        items[item] === selectedItem ? "active" : ""
                    }`}
                    onClick={() => onItemSelect(items[item])}
                    role="button"
                >
                    {items[item]?.[contentProp]}
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProp: "_id",
    contentProp: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProp: PropTypes.oneOfType([PropTypes.string, PropTypes.symbol])
        .isRequired,
    contentProp: PropTypes.oneOfType([PropTypes.string, PropTypes.symbol])
        .isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};
