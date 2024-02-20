import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </a>
        </li>

        {pageNumbers?.map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <a className="page-link" href="#" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
