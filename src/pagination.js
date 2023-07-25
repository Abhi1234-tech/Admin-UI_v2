// File: pagination.js
//created sepate file for spearete compoent / functionality as got suggestion in last feedback
import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handleFirstPage = () => onPageChange(1);
  const handlePreviousPage = () => onPageChange(Math.max(currentPage - 1, 1));
  const handleNextPage = () =>
    onPageChange(Math.min(currentPage + 1, totalPages));
  const handleLastPage = () => onPageChange(totalPages);

  return (
    <div className="pagination-container">
      <div className="pagination-buttons">
        <button
          key="first"
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          key="prev"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {[...Array(totalPages).keys()].map((i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={i + 1 === currentPage ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          key="next"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          key="last"
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
