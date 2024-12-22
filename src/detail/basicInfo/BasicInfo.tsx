import React, { JSX } from "react";

import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExplicitIcon from "@mui/icons-material/Explicit";

import { Movie } from "../types/movie";
import { extractYear, formatRuntime } from "../../util/DateUtil";

interface BasicInfoProps {
  movie: Movie;
}

const BasicInfo = ({ movie }: BasicInfoProps): JSX.Element => {
  return (
    <>
      <Typography variant="h1">
        {movie.title} ({extractYear(movie.release_date)})
      </Typography>
      <Divider />
      <Typography variant="h2">{formatRuntime(movie.runtime)}</Typography>
      <Divider />
      <Typography>
        {movie?.genres?.map((genre) => genre.name).join(", ")}
      </Typography>
      <Divider />
      <Typography>{movie.tagline}</Typography>
      <Divider />
      <Typography>{movie.overview}</Typography>
      <Divider />
      <Tooltip title="MPA Rating">
        <Typography>
          Parental Guide:
          <IconButton
            aria-label={`info about ${movie.title}`}
            color={movie.adult ? "error" : "success"}
          >
            {movie.adult ? <ExplicitIcon /> : <CheckCircleIcon />}
          </IconButton>
        </Typography>
      </Tooltip>
    </>
  );
};

export default BasicInfo;
