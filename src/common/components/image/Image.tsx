import React, { JSX } from "react";

import { ImageProps } from "./props/ImageProps";
import { ImageListItem, ImageListItemBar } from "@mui/material";

import { generateIMDBURL, generateImageURL } from "../../../util/URLResolver";

const Image = ({
  key,
  path,
  alt,
  title,
  subtitle,
  imdbID,
}: ImageProps): JSX.Element => {
  return imdbID ? (
    <ImageListItem key={key}>
      <a href={generateIMDBURL(imdbID)} target="_blank" rel="noreferrer">
        <img src={generateImageURL(path)} alt={alt} />
        <ImageListItemBar title={title} subtitle={subtitle} />
      </a>
    </ImageListItem>
  ) : (
    <ImageListItem key={key}>
      <img src={generateImageURL(path)} alt={alt} />
      <ImageListItemBar title={title} subtitle={subtitle} />
    </ImageListItem>
  );
};

export default Image;
