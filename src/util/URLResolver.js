const API_KEY = process.env.REACT_APP_TMDB_API_KEY

export function generateImageURL(imagePath) {
    if (!imagePath) {
        return '';
    }
    return `http://image.tmdb.org/t/p/w500${imagePath}`;
}

export function generateMovieDetailURL(id) {
    if (!id) {
        return '';
    }
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
}

export function generateDiscoverURL() {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`
}

export function generateMovieSearchURL(query) {
    if (!query) {
        return '';
    }
    return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`
}

export function generateIMDBURL(imdbID) {
    if (!imdbID) {
        return '';
    }
    return `https://www.imdb.com/title/${imdbID}`
}