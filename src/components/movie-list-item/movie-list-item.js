import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import './movie-list-item.css';
import GenresContext from '../genres-context/genres-context';

// ФУНКЦИЯ СОКРАЩЕНИЯ ОПИСАНИЯ
function truncateText(text, limit = 150) {
  if (text.length <= limit) return text;

  const cutIndex = text.lastIndexOf(' ', limit);
  return `${text.slice(0, cutIndex)}...`;
}

export default class MovieListItem extends Component {
  // eslint-disable-next-line react/static-property-placement
  static contextType = GenresContext;

  getGenresName = (genreId) => {
    const genres = this.context;
    if (!genreId) return [];
    return genreId
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean);
  };

  generateClass = () => {
    const { voteAverage } = this.props;
    if (voteAverage <= 3) {
      return 'movie_rating--red';
    }
    if (voteAverage > 3 && voteAverage <= 5) {
      return 'movie_rating--orange';
    }
    if (voteAverage > 5 && voteAverage <= 7) {
      return 'movie_rating--yellow';
    }
    return 'movie_rating--green';
  };

  render() {
    const {
      originalTitle,
      overview,
      releaseDate,
      voteAverage,
      posterPath,
      actionTab,
      updateGuestVote,
      rating,
      movieId,
      genresId,
    } = this.props;
    const movieGenres = this.getGenresName(genresId);
    const truncatedOverview = truncateText(overview);
    return (
      <li className="movie_list-item">
        <div className="movie_list-item--desktop">
          <div className="movie_picture">
            <img
              src={
                posterPath
                  ? `https://image.tmdb.org/t/p/w500${posterPath}`
                  : '/no-img.jpg'
              }
              alt="Film"
            />
          </div>
          <div className="movie_info">
            <div className="movie_header">
              <h5 className="movie_info-title">{originalTitle}</h5>
              <div className={`movie_rating ${this.generateClass()}`}>
                {voteAverage.toFixed(1)}
              </div>
            </div>
            <span className="movie_info-year">{releaseDate}</span>
            <div className="movie_info-categories">
              {movieGenres.length > 0 ? (
                movieGenres.map((genre) => {
                  return (
                    <span key={genre} className="movie_info-categories-item">
                      {genre}
                    </span>
                  );
                })
              ) : (
                <span className="movie_info-categories-item">Unknown</span>
              )}
            </div>
            <span className="monvie_info-text">{truncatedOverview}</span>
            <div className="movie_rated">
              {actionTab === 'search' ? (
                <Rate
                  allowHalf
                  count={10}
                  onChange={(value) => {
                    updateGuestVote(movieId, value);
                  }}
                  value={rating || 0}
                />
              ) : (
                <Rate allowHalf count={10} value={rating} />
              )}
            </div>
          </div>
        </div>
        <div className="movie_info--mobile">
          <span className="monvie_info-text--mobile">{truncatedOverview}</span>
          <div className="movie_rated--mobile">
            {actionTab === 'search' ? (
              <Rate
                allowHalf
                count={10}
                onChange={(value) => {
                  updateGuestVote(movieId, value);
                }}
                value={rating || 0}
              />
            ) : (
              <Rate allowHalf count={10} value={rating} />
            )}
          </div>
        </div>
      </li>
    );
  }
}

MovieListItem.propTypes = {
  originalTitle: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  posterPath: PropTypes.string,
  actionTab: PropTypes.string.isRequired,
  updateGuestVote: PropTypes.func.isRequired,
  rating: PropTypes.number,
  movieId: PropTypes.number.isRequired,
  genresId: PropTypes.arrayOf(PropTypes.number).isRequired,
};

MovieListItem.defaultProps = {
  posterPath: '/no-img.jpg',
  rating: 0,
};
