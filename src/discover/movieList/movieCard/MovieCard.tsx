import React, { JSX } from "react";

import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

import { generateImageURL } from "../../../util/URLResolver";
import { Movie } from "../../../detail/types/movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps): JSX.Element => {
  const navigate = useNavigate();

  const detailMovie = (id: number) => {
    navigate(`/movies/${id}`);
  };

  return (
    <ImageListItem key={movie.id}>
      <img
        src={generateImageURL(movie.poster_path)}
        alt={movie.name}
        onClick={() => detailMovie(movie.id)}
      />
      <ImageListItemBar
        title={movie.title}
        subtitle={
          <Rating
            name="read-only"
            value={Math.floor(movie.vote_average)}
            readOnly
            max={10}
          />
        }
        actionIcon={
          <Tooltip disableFocusListener title={movie.overview}>
            <IconButton aria-label={`info about ${movie.title}`} color="info">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        }
      />
    </ImageListItem>
  );
};

export default MovieCard;
