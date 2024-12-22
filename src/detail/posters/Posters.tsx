import React, { JSX } from "react";

import { ImageList } from "@mui/material";

import Image from "../../common/components/image/Image";
import { Movie } from "../types/movie";

interface PostersProps {
  movie: Movie;
  isLargeViewport: boolean;
}

const Posters = ({
  movie,
  isLargeViewport,
}: PostersProps): JSX.Element => {
  return (
    <ImageList cols={isLargeViewport ? 2 : 1}>
      <Image
        key={movie.imdb_id}
        path={movie.poster_path}
        alt={`${movie.title} poster`}
        title="Poster"
        subtitle={movie.original_title}
        imdbID={movie.imdb_id}
      />
      <Image
        key={movie.id}
        path={movie.backdrop_path}
        alt={`${movie.title} backdrop`}
        title="Backdrop"
        subtitle={movie.original_title}
        imdbID={movie.imdb_id}
      />
    </ImageList>
  );
};

export default Posters;
