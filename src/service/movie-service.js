import { method } from 'lodash';

export default class MovieService {
  apiBase = 'https://api.themoviedb.org/3/search/movie?query=';

  guestSessionUrl =
    'https://api.themoviedb.org/3/authentication/guest_session/new';

  apiKey = 'cc9dd7142e93accdae34b0152b35a041';

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzlkZDcxNDJlOTNhY2NkYWUzNGIwMTUyYjM1YTA0MSIsIm5iZiI6MTc0MDM2NDE3MC4yNzAwMDAyLCJzdWIiOiI2N2JiZDk4YTU1ZTM5OTRiYmQ0NmE4YTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dKGRpatNM8g8c8E4y7FnJ7qwZ0dB52Twy3aq74qSgIg',
    },
  };

  async getResource(query, page = 1) {
    try {
      const results = await fetch(
        `${this.apiBase}${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`,
        this.options
      );
      if (!results.ok) {
        throw new Error(`Ошибка HTTP: ${results.status}`);
      }
      const data = await results.json();
      return data;
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Нет интернет-соединения. Проверьте подключение.');
      }
      throw error;
    }
  }

  async guestSession() {
    if (localStorage.getItem('guestSessionId')) {
      return;
    }
    try {
      const result = await fetch(`${this.guestSessionUrl}`, this.options);
      if (!result.ok) {
        throw new Error(`Ошибка HTTP: ${result.status}`);
      }
      const data = await result.json();
      localStorage.setItem('guestSessionId', data.guest_session_id);
    } catch (error) {
      throw new Error('Ошибка при создании гостевой сессии');
    }
  }

  async postRating(movieId, guestSessionId, rating) {
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: rating }),
    };

    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`;
    try {
      const response = await fetch(url, postOptions);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Ошибка при отправке рейтинга', error);
      return null;
    }
  }

  async getRatingMovie(guestSessionId) {
    if (!guestSessionId) {
      throw new Error('Не найден guestSessionId');
    }
    const getOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}`;
    try {
      const response = await fetch(url, getOptions).catch((err) => {
        console.error('Ошибка в запросе:', err);
        throw new Error('Ошибка при выполнении запроса.');
      });
      console.log('Статус ответа:', response.status);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const result = await response.json();
      if (result && result.results && result.results.length > 0) {
        return result;
      }
      throw new Error('Нет оцененных фильмов.');
    } catch (error) {
      console.error('Ошибка при получении рейтинга', error);
      throw error;
    }
  }

  async getGenres() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    try {
      const response = await fetch(url, this.options);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const result = await response.json();
      return result.genres;
    } catch (error) {
      console.error('Ошибка при получении жанров', error);
      return null;
    }
  }
}
