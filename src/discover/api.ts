const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export function getDiscoverURL() {
  return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
}

export function getMovieSearchURL(query: string) {
  if (!query) {
    return "";
  }
  return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`;
}
