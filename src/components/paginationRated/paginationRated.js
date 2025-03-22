import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

function PagePaginationRated({
  currentPageRated,
  totalPageRated,
  onPageChangeRated,
}) {
  return (
    <Pagination
      align="center"
      defaultCurrent={currentPageRated}
      total={totalPageRated}
      onChange={onPageChangeRated}
    />
  );
}

PagePaginationRated.propTypes = {
  currentPageRated: PropTypes.number.isRequired,
  totalPageRated: PropTypes.number.isRequired,
  onPageChangeRated: PropTypes.func.isRequired,
};

export default PagePaginationRated;
