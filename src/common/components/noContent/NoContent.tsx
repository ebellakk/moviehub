import React, { JSX } from "react";

import { Typography } from "@mui/material";

export const NoContent = (): JSX.Element => (
  <div>
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/nocontent.jpg`}
      alt="no result"
      style={{ maxWidth: "100%" }}
    />
    <Typography>No result</Typography>
  </div>
);
