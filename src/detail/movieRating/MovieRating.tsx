import React, { JSX } from "react";

import { Box, Container, Rating } from "@mui/material";

interface MovieRatingProps {
  voteAverage: number;
}

const MovieRating = ({ voteAverage }: MovieRatingProps): JSX.Element => {
  return (
    <Container maxWidth={false} disableGutters>
      <Box bgcolor="grey.500">
        <Rating
          name="read-only"
          value={Math.floor(voteAverage)}
          readOnly
          max={10}
        />
      </Box>
    </Container>
  );
};

export default MovieRating;
