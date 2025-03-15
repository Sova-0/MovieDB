import React from 'react';
import PropTypes from 'prop-types';
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/spinner';
import MovieList from '../movie-list/movie-list';
import NoResult from '../no-result/noResult';
import PagePagination from '../pagination/pagination';
import SearchInput from '../search-input/search-input';

function SearchActiveTab({
  movieData,
  loading,
  error,
  errorMessage,
  searchQuery,
  noResult,
  currentPage,
  totalPage,
  onSearchChange,
  updateMovie,
  onPageChange,
  actionTab,
  updateGuestVote,
  guestVote,
}) {
  const hasData = !(loading || error);
  const errorShow = error ? (
    <ErrorIndicator errorMessage={errorMessage} />
  ) : null;
  const spinner = loading ? <Spinner /> : null;
  const content = hasData ? (
    <MovieList
      movieData={movieData}
      loading={loading}
      actionTab={actionTab}
      updateGuestVote={updateGuestVote}
      guestVote={guestVote}
    />
  ) : null;
  const noRes = noResult ? <NoResult searchQuery={searchQuery} /> : null;
  const pagination = hasData ? (
    <PagePagination
      currentPage={currentPage}
      totalPage={totalPage}
      onPageChange={onPageChange}
    />
  ) : null;

  return (
    <div>
      {!error && (
        <SearchInput
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          updateMovie={updateMovie}
        />
      )}
      {errorShow}
      {spinner}
      {content}
      {pagination}
      {noRes}
    </div>
  );
}

SearchActiveTab.propTypes = {
  movieData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string.isRequired,
      overview: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
      poster_path: PropTypes.string,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  actionTab: PropTypes.oneOf(['search', 'rated']).isRequired,
  searchQuery: PropTypes.string.isRequired,
  noResult: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  updateMovie: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  updateGuestVote: PropTypes.func.isRequired,
  guestVote: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default SearchActiveTab;
