import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks";

export const TableBody = ({ data, columns }) => {
    const { currentUser } = useAuth();

    const renderDataItem = (item, column, columnName) => {
        const { component } = column;
        if (columnName === "delete") {
            return item._id === currentUser._id ? component(item) : null;
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
