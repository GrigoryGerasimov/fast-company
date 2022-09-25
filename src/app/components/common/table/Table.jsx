import React from "react";
import { TableBody, TableHeader } from "./index";
import PropTypes from "prop-types";

export const Table = ({ onSort, selectedSort, columns, data, children }) => {
    return (
        <table className="table align-middle">
            {children || (
                <>
                    <TableHeader {...{ onSort, selectedSort, columns }} />
                    <TableBody data={data} columns={columns} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.array
};
