import React from 'react';
import { Pagination } from 'antd';

function PagePagination({ currentPage, totalPage, onPageChange }) {
  <Pagination
    align="center"
    defaultCurrent={currentPage}
    total={totalPage * 20}
    onChange={onPageChange}
  />;
}
export default PagePagination;
