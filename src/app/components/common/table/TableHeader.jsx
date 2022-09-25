import React from "react";
import PropTypes from "prop-types";

export const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        selectedSort.path === item
            ? onSort({
                  ...selectedSort,
                  order: selectedSort.order === "asc" ? "desc" : "asc",
                  arrow:
                      selectedSort.order === "asc" ? (
                          <i className="bi bi-caret-down-fill"></i>
                      ) : (
                          <i className="bi bi-caret-up-fill"></i>
                      )
              })
            : onSort({
                  path: item,
                  order: "asc",
                  arrow: <i className="bi bi-caret-up-fill"></i>
              });
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => {
                                      handleSort(columns[column].path);
                                  }
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {selectedSort.path === columns[column].path &&
                            selectedSort.arrow}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
