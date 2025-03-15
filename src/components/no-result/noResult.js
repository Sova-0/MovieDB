import './no-result.css';
import PropTypes from 'prop-types';

function NoResult({ searchQuery }) {
  return <div className="no-results">No result found for {searchQuery}</div>;
}

NoResult.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
export default NoResult;
