import React, { JSX } from "react";

import { ImageList } from "@mui/material";

import { Image } from "../../common/components/image/Image";
import { Movie } from "../types/movie";

type PostersProps = Pick<
  Movie,
  | "id"
  | "imdb_id"
  | "poster_path"
  | "title"
  | "original_title"
  | "imdb_id"
  | "backdrop_path"
> & { isLargeViewport: boolean };

export const Posters = ({
  id,
  imdb_id,
  poster_path,
  title,
  original_title,
  backdrop_path,
  isLargeViewport,
}: PostersProps): JSX.Element => {
  return (
    <ImageList cols={isLargeViewport ? 2 : 1}>
      <Image
        key={imdb_id}
        path={poster_path}
        alt={`${title} poster`}
        title="Poster"
        subtitle={original_title}
        imdbID={imdb_id}
      />
      <Image
        key={id}
        path={backdrop_path}
        alt={`${title} backdrop`}
        title="Backdrop"
        subtitle={original_title}
        imdbID={imdb_id}
      />
    </ImageList>
  );
};
