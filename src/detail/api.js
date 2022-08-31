const API_KEY = process.env.REACT_APP_TMDB_API_KEY

export function getMovieDetailURL(id) {
    if (!id) {
        return '';
    }
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
}