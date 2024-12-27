import React, { JSX } from "react";

import { ImageListItem, ImageListItemBar } from "@mui/material";

import { generateIMDBURL, generateImageURL } from "../../util/URLResolver";

interface ImageProps {
  key: number | string;
  path: string;
  alt: string;
  title: string;
  subtitle: string;
  imdbID?: string;
}

export const Image = ({
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
