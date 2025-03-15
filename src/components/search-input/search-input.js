import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

function SearchInput({ onSearchChange, searchQuery }) {
  return (
    <Input
      placeholder="Basic usage"
      onChange={onSearchChange}
      value={searchQuery}
    />
  );
}

export default SearchInput;

SearchInput.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
