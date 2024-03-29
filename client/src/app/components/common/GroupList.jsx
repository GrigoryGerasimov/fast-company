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
                        item[valueProp] === selectedItem ? "active" : ""
                    }`}
                    onClick={() => onItemSelect(item[valueProp])}
                    role="button"
                >
                    {item[contentProp]}
                </li>
            )) : Object.keys(items).map((item) => (
                <li
                    key={items[item]?.[valueProp]}
                    className={`list-group-item ${
                        items[item]?.[valueProp] === selectedItem ? "active" : ""
                    }`}
                    onClick={() => onItemSelect(items[item]?.[valueProp])}
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
    selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
