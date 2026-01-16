import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 5;
  const pages = [];

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-primary-card hover:bg-primary-accent disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
      >
        <FiChevronLeft size={20} />
      </motion.button>

      {startPage > 1 && (
        <>
          <PageButton page={1} currentPage={currentPage} onPageChange={onPageChange} />
          {startPage > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <PageButton
          key={page}
          page={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
          <PageButton page={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
        </>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-primary-card hover:bg-primary-accent disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
      >
        <FiChevronRight size={20} />
      </motion.button>
    </div>
  );
};

const PageButton = ({ page, currentPage, onPageChange }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onPageChange(page)}
    className={`${
      page === currentPage
        ? 'bg-primary-accent text-white'
        : 'bg-primary-card text-gray-300 hover:bg-white/10'
    } px-4 py-2 rounded-lg font-semibold transition-colors min-w-[40px]`}
  >
    {page}
  </motion.button>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

PageButton.propTypes = {
  page: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
