import React, { JSX } from "react";

import { Typography } from "@mui/material";

const NoContent = (): JSX.Element => (
  <div>
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/nocontent.jpg`}
      alt="no result"
    />
    <Typography>No result</Typography>
  </div>
);

export default NoContent;
