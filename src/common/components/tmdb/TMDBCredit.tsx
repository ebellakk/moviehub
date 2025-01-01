import React, { JSX } from "react";

import { Typography } from "@mui/material";

export const TMDBCredit = (): JSX.Element => (
  <div
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <img
      id="moviehub-tmdb-credit"
      src={`${process.env.PUBLIC_URL}/assets/images/tmdb.svg`}
      alt="tmdb credit"
      style={{ width: "100px" }}
    />
    <Typography p={2}>
      This product uses the{" "}
      <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
        TMDB API{" "}
      </a>{" "}
      but is not endorsed or certified by TMDB.
    </Typography>
  </div>
);
