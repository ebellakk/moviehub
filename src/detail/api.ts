const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;

export function getMovieDetailURL(id: string) {
  if (!id) {
    return "";
  }
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
}
