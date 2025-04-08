// src/components/Pagination.jsx
import React from 'react';
import '../components/Pagination.css';

const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        ⬅️ Prev
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          className={currentPage === idx + 1 ? 'active' : ''}
          onClick={() => setCurrentPage(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next ➡️
      </button>
    </div>
  );
};

export default Pagination;
