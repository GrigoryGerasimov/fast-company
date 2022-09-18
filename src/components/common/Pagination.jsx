import React from "react";
import PropTypes from "prop-types";
import { getPagesRange } from "../../utils/paginate.js";

export const Pagination = ({
    itemsCount,
    pageSize,
    onPageChange,
    currentPage
}) => {
    const [pageCount, pages] = getPagesRange(itemsCount, pageSize);
    if (pageCount === 1) return null;

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        key={`page_${page}`}
                        className={`page-item ${
                            page === currentPage ? `active` : ``
                        }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};
