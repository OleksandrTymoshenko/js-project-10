export default class ApiService {
  _apiKey = '4a69d9470951ad07e8f0cc655bb46705';

  constructor() {
    (this.searchQuery = ''), (this.page = 1);
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get query() {
    return this.searchQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  async getPopularFilms() {
    return await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${this._apiKey}&page=${this.page}`,
    )
      .then(response => response.json())
      .then(data => data.results)
      .catch(error => console.error(error));
  }

  async getFilmsByName() {
    return await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${this.searchQuery}&api_key=${this._apiKey}`,
    )
      .then(response => response.json())
      .then(data => data.results)
      .catch(error => console.error(error));
  }

  async getFilmDetails(id) {
    return await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${this._apiKey}`)
      .then(response => response.json())
      .catch(error => console.error(error));
  }
}
