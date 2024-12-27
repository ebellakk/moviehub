import React, { JSX } from "react";

import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExplicitIcon from "@mui/icons-material/Explicit";

import { Movie } from "../types/movie";
import { extractYear, formatRuntime } from "../../common/util/DateUtil";

type BasicInfoProps = Pick<
  Movie,
  | "title"
  | "release_date"
  | "runtime"
  | "genres"
  | "tagline"
  | "overview"
  | "adult"
>;

export const MovieBasicInfo = ({
  title,
  release_date,
  runtime,
  genres,
  tagline,
  overview,
  adult,
}: BasicInfoProps): JSX.Element => {
  const formattedRuntime = formatRuntime(runtime);
  const genreList = genres?.map((genre) => genre.name).join(", ");
  const year = extractYear(release_date);
  return (
    <>
      <Typography variant="h1">
        {title} ({year})
      </Typography>
      <Divider />
      <Typography variant="h2">{formattedRuntime}</Typography>
      <Divider />
      <Typography>{genreList}</Typography>
      <Divider />
      <Typography>{tagline}</Typography>
      <Divider />
      <Typography>{overview}</Typography>
      <Divider />
      <Tooltip title="MPA Rating">
        <Typography>
          Parental Guide:
          <IconButton
            aria-label={`info about ${title}`}
            color={adult ? "error" : "success"}
          >
            {adult ? <ExplicitIcon /> : <CheckCircleIcon />}
          </IconButton>
        </Typography>
      </Tooltip>
    </>
  );
};
