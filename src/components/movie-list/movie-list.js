import React, { useContext } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import MovieListItem from '../movie-list-item/movie-list-item';
import './movie-list.css';
import GenresContext from '../genres-context/genres-context';

function MovieList({ movieData, actionTab, guestVote, updateGuestVote }) {
  const genres = useContext(GenresContext);
  return (
    <div className="movie_wrapper">
      <ul className="movie_list">
        {movieData?.map((movie) => {
          const formatReleaseDate = movie.release_date
            ? format(new Date(movie.release_date), 'MMMM d, yyyy')
            : 'Date not avalible';

          return (
            <MovieListItem
              key={movie.id}
              movieId={movie.id}
              originalTitle={movie.original_title}
              overview={movie.overview}
              releaseDate={formatReleaseDate}
              voteAverage={movie.vote_average}
              posterPath={movie.poster_path}
              actionTab={actionTab}
              updateGuestVote={updateGuestVote}
              genresId={movie.genre_ids}
              rating={guestVote[movie.id] || movie.rating}
            />
          );
        })}
      </ul>
    </div>
  );
}

MovieList.propTypes = {
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
  actionTab: PropTypes.string.isRequired,
  guestVote: PropTypes.objectOf(PropTypes.number).isRequired,
  updateGuestVote: PropTypes.func.isRequired,
};

export default MovieList;
