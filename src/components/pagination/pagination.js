import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

function PagePagination({ currentPage, totalPage, onPageChange }) {
  return (
    <Pagination
      align="center"
      defaultCurrent={currentPage}
      total={totalPage}
      onChange={onPageChange}
    />
  );
}

PagePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default PagePagination;
