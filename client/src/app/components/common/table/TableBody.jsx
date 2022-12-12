import React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users.js";
import PropTypes from "prop-types";

export const TableBody = ({ data, columns }) => {
    const currentUserId = useSelector(getCurrentUserId());

    const renderDataItem = (item, column, columnName) => {
        const { component } = column;
        if (columnName === "delete") {
            return item._id === currentUserId ? component(item) : null;
        } else if (columnName === "rate") {
            return _.get(item, column.path).toPrecision(2);
        } else {
            return component ? typeof component === "function" ? component(item) : component : _.get(item, column.path);
        }
    };

    return (
        <tbody>
            {data.map((dataItem) => (
                <tr key={dataItem._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>
                            {renderDataItem(dataItem, columns[column], column)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.object.isRequired
};
