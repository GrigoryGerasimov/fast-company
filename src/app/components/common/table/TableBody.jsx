import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export const TableBody = ({ data, columns }) => {
    const renderDataItem = (item, column) => {
        const { component } = column;
        if (component) {
            return typeof component === "function" ? component(item) : component;
        } else {
            return _.get(item, column.path);
        }
    };

    return (
        <tbody>
            {data.map((dataItem) => (
                <tr key={dataItem._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>
                            {renderDataItem(dataItem, columns[column])}
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
