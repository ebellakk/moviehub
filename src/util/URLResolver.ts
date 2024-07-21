export function generateImageURL(imagePath: string) {
  if (!imagePath) {
    return "";
  }
  return `http://image.tmdb.org/t/p/w500${imagePath}`;
}

export function generateIMDBURL(imdbID: string) {
  if (!imdbID) {
    return "";
  }
  return `https://www.imdb.com/title/${imdbID}`;
}
