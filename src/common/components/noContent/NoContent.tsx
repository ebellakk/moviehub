import React, { JSX } from "react";

import { Typography } from "@mui/material";

export const NoContent = (): JSX.Element => (
  <div>
    <img
      id="moviehub-no-content"
      src='assets/images/nocontent.jpg'
      alt="no result"
      style={{ maxWidth: "100%" }}
    />
    <Typography>No result</Typography>
  </div>
);
