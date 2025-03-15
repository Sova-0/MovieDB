import React from 'react';
import PropTypes from 'prop-types';

import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/spinner';
import NoResult from '../no-result/noResult';
import MovieList from '../movie-list/movie-list';

function RatedActiveTab({
  loading,
  error,
  errorMessage,
  searchQuery,
  noResult,
  guestVote,
  actionTab,
  ratedMovieData,
}) {
  const hasData = !(loading || error);
  const errorShow = error ? (
    <ErrorIndicator errorMessage={errorMessage} />
  ) : null;
  const spinner = loading ? <Spinner /> : null;

  const content = hasData ? (
    <MovieList
      movieData={ratedMovieData}
      loading={loading}
      actionTab={actionTab}
      guestVote={guestVote}
    />
  ) : null;
  const noRes = noResult ? <NoResult searchQuery={searchQuery} /> : null;
  const noRatedMovie =
    ratedMovieData.length === 0 ? (
      <div className="no-rated-movie">You haven`t rated any movies yet</div>
    ) : null;
  return (
    <div>
      {noRatedMovie}
      {errorShow}
      {spinner}
      {content}
      {noRes}
    </div>
  );
}

RatedActiveTab.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  actionTab: PropTypes.oneOf(['search', 'rated']).isRequired,
  searchQuery: PropTypes.string.isRequired,
  noResult: PropTypes.bool.isRequired,
  guestVote: PropTypes.objectOf(PropTypes.number).isRequired,
  ratedMovieData: PropTypes.arrayOf(
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
};

export default RatedActiveTab;
