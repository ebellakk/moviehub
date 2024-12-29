import React, { JSX } from "react";

import { Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface PaginationButtonProps {
  onClickCallback: () => void;
  type: "backward" | "forward";
  disabled?: boolean;
}

export const PaginationButton = ({
  onClickCallback,
  type,
  disabled,
}: PaginationButtonProps): JSX.Element => {
  const isBackward = type === "backward";
  return (
    <Fab
      aria-label="back"
      id={`moviehub-pagination-${type}`}
      title="Back"
      color="primary"
      style={{
        position: "sticky",
        bottom: "50%",
        zIndex: 9999,
        float: isBackward ? "left" : "right",
        marginLeft: isBackward ? "1rem" : undefined,
        marginRight: isBackward ? undefined : "1rem",
      }}
      onClick={onClickCallback}
      disabled={disabled}
    >
      {type === "backward" ? <ArrowBackIcon /> : <ArrowForwardIcon />}
    </Fab>
  );
};
