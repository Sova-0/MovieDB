import React, { Component } from 'react';
import _ from 'lodash';
import './app.css';
import { Tabs } from 'antd';
import SearchActiveTab from '../search-active-tab/search-active-tab';
import RatedActiveTab from '../rated-active-tab/rated-active-tab';
import MovieService from '../../service/movie-service';
import GenresContext from '../genres-context/genres-context';

export default class App extends Component {
  movieService = new MovieService();

  updateMovie = _.debounce(() => {
    const { searchQuery, currentPage } = this.state;
    if (!searchQuery) return;

    this.setState({ loading: true });

    this.movieService
      .getResource(searchQuery, currentPage)
      .then((data) => {
        const movie = data.results;
        const totalPage = data.total_pages;
        this.setState({
          movieData: movie,
          loading: false,
          noResult: movie.length === 0,
          totalPage,
        });
      })
      .catch(this.onError);
  }, 400);

  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      loading: false,
      error: false,
      errorMessage: '',
      searchQuery: '',
      noResult: false,
      currentPage: 1,
      totalPage: null,
      guestSessionId: null,
      actionTab: 'search',
      guestVote: {},
      ratedMovieData: [],
      genres: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem('guestSessionId')) {
      this.setState({
        guestSessionId: localStorage.getItem('guestSessionId'),
      });
      return;
    }
    this.movieService
      .getGenres()
      .then((genres) => {
        this.setState({ genres });
      })
      .catch((error) => {
        console.error('Ошибка загрузки жанров', error);
      });

    this.movieService
      .guestSession()
      .then((sessionId) => {
        this.setState({ guestSessionId: sessionId });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onSearchChange = (event) => {
    this.setState(
      {
        searchQuery: event.target.value,
      },
      () => {
        this.updateMovie();
      }
    );
  };

  onPageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.updateMovie();
    });
  };

  onError = (error) => {
    this.setState({
      error: true,
      loading: false,
      errorMessage: error.message,
    });
  };

  onTabChange = (tab) => {
    const { actionTab } = this.state;
    if (actionTab === tab) return;
    if (actionTab === 'search') {
      this.handleRatedTab();
    }
    this.setState({ actionTab: tab });
  };

  updateGuestVote = (movieId, rating) => {
    const { guestSessionId } = this.state;
    this.movieService
      .postRating(movieId, guestSessionId, rating)
      .then(() => {
        this.setState((prevState) => ({
          guestVote: {
            ...prevState.guestVote,
            [movieId]: rating,
          },
        }));
      })
      .catch((error) => {
        console.error('Ошибка при отправке рейтинга', error);
      });
  };

  handleRatedTab = () => {
    // if (this.state.ratedMovieData.length === 0){
    //   return
    // }
    const { guestSessionId } = this.state;
    this.movieService.getRatingMovie(guestSessionId).then((data) => {
      const movie = data.results;
      const totalPage = data.total_pages;
      this.setState({
        ratedMovieData: movie,
        loading: false,
        totalPage,
      });
    });
  };

  render() {
    const {
      movieData,
      loading,
      error,
      errorMessage,
      searchQuery,
      noResult,
      currentPage,
      totalPage,
      guestVote,
      actionTab,
      ratedMovieData,
      genres,
    } = this.state;
    const { TabPane } = Tabs;

    return (
      <GenresContext.Provider value={genres}>
        <div className="container">
          <Tabs onChange={this.onTabChange}>
            <TabPane tab="Search" key="search">
              <SearchActiveTab
                errorMessage={errorMessage}
                movieData={movieData}
                loading={loading}
                searchQuery={searchQuery}
                currentPage={currentPage}
                totalPage={totalPage}
                onPageChange={this.onPageChange}
                onSearchChange={this.onSearchChange}
                updateMovie={this.updateMovie}
                noResult={noResult}
                error={error}
                actionTab={actionTab}
                guestVote={guestVote}
                updateGuestVote={this.updateGuestVote}
              />
            </TabPane>
            <TabPane tab="Rated" key="rated">
              <RatedActiveTab
                errorMessage={errorMessage}
                loading={loading}
                currentPage={currentPage}
                totalPage={totalPage}
                onPageChange={this.onPageChange}
                error={error}
                guestVote={guestVote}
                actionTab={actionTab}
                ratedMovieData={ratedMovieData}
              />
            </TabPane>
          </Tabs>
        </div>
      </GenresContext.Provider>
    );
  }
}
