import React, { JSX } from "react";

import {
  Box,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

import { generateImageURL } from "../../../common/util/URLResolver";
import { Movie } from "../../../detail/types/movie";

type MovieCardProps = Pick<
  Movie,
  "id" | "title" | "name" | "vote_average" | "poster_path" | "overview"
>;

export const MovieCard = ({
  id,
  title,
  name,
  vote_average,
  poster_path,
  overview,
}: MovieCardProps): JSX.Element => {
  const isLargeViewport = useMediaQuery("(min-width:769px)");
  const navigate = useNavigate();

  const detailMovie = (id: number) => {
    navigate(`/movies/${id}`);
  };

  return (
    <ImageListItem key={id}>
      <img
        id={`moviehub-movie-${id}`}
        src={generateImageURL(poster_path)}
        alt={name}
        onClick={() => detailMovie(id)}
      />
      <ImageListItemBar
        title={<span style={{ textWrap: "pretty" }}>{title}</span>}
        subtitle={
          isLargeViewport ? (
            <Rating
              name="read-only"
              value={Math.floor(vote_average)}
              readOnly
              max={10}
            />
          ) : (
            <Box display="inline-flex" alignItems="center">
              <Box>
                <StarIcon />
              </Box>
              <Box style={{ color: "black" }}>{Math.floor(vote_average)}</Box>
            </Box>
          )
        }
        actionIcon={
          <Tooltip disableFocusListener title={overview}>
            <IconButton aria-label={`info about ${title}`} color="info">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        }
      />
    </ImageListItem>
  );
};
