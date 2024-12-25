const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export function getDiscoverURL(page: number) {
  return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc`;
}

export function getMovieSearchURL(query: string, page: number) {
  if (!query) {
    return "";
  }
  return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
}
