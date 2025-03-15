// import React, { Component } from 'react';

// import '../movie-list-item/movie-list-item.css';

// export default class MovieListRated extends Component {
//   // ФУНКЦИЯ СОКРАЩЕНИЯ ОПИСАНИЯ
//   truncateText(text, limit = 210) {
//     if (text.length <= limit) return text;

//     let cutIndex = text.lastIndexOf(' ', limit);
//     return text.slice(0, cutIndex) + '...';
//   }
//   render() {
//     const { originalTitle, overview, releaseDate, voteAverage, posterPath } =
//       this.props;

//     return (
//       <div className="movie_list-item">
//         <div className="movie_picture">
//           <img src={`https://image.tmdb.org/t/p/w500${posterPath}`}></img>
//         </div>
//         <div className="movie_info">
//           <h5 className="movie_info-title">{originalTitle}</h5>
//           <span className="movie_info-year">{releaseDate}</span>
//           <div className="movie_info-categories">
//             <span className="movie_info-categories-item">Action</span>
//             <span className="movie_info-categories-item">Drama</span>
//           </div>
//           <span className="monvie_info-text">
//             {this.truncateText(overview)}
//           </span>
//         </div>
//       </div>
//     );
//   }
// }
