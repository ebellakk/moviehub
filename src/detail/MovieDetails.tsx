import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  ImageList,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExplicitIcon from "@mui/icons-material/Explicit";

import { getMovieDetailURL } from "./api";
import { extractYear, formatRuntime } from "../util/DateUtil";
import { Movie } from "./types/movie";

import Image from "../common/components/image/Image";

const MovieDetails = () => {
  const isLargeViewport = useMediaQuery("(min-width:769px)");

  const { uri } = useParams();

  const [movie, setMovie] = useState<Movie>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const url = getMovieDetailURL(uri);

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setMovie(json);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [uri]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!movie?.id) {
    return (
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/nocontent.jpg`}
          alt="no result"
        />
        <Typography>No result</Typography>
        <Fab
          aria-label="back"
          title="Back"
          color="primary"
          onClick={() => navigate("/movies")}
        >
          <ArrowBackIcon />
        </Fab>
      </div>
    );
  }

  return (
    <div>
      <ImageList cols={isLargeViewport ? 2 : 1}>
        <Image
          key={movie.imdb_id}
          path={movie.poster_path}
          alt={`${movie.title} poster`}
          title="Poster"
          subtitle={movie.original_title}
          imdbID={movie.imdb_id}
        />
        <Image
          key={movie.id}
          path={movie.backdrop_path}
          alt={`${movie.title} backdrop`}
          title="Backdrop"
          subtitle={movie.original_title}
          imdbID={movie.imdb_id}
        />
      </ImageList>
      <Divider />
      <Typography variant="h1">
        {movie.title} ({extractYear(movie.release_date)})
      </Typography>
      <Divider />
      <Typography variant="h2">{formatRuntime(movie.runtime)}</Typography>
      <Divider />
      <ImageList cols={isLargeViewport ? 3 : 2}>
        {movie?.production_companies?.map((company) => (
          <Image
            key={company.id}
            path={company.logo_path}
            alt={company.name}
            title={company.name}
            subtitle={company.origin_country}
          />
        ))}
      </ImageList>
      <Divider />
      <Typography>
        {movie?.genres?.map((genre) => genre.name).join(", ")}
      </Typography>
      <Divider />
      <Typography>{movie.tagline}</Typography>
      <Divider />
      <Container maxWidth={false} disableGutters>
        <Box bgcolor="grey.500">
          <Rating
            name="read-only"
            value={Math.floor(movie.vote_average)}
            readOnly
            max={10}
          />
        </Box>
      </Container>
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
      <Divider />
      <Typography>{movie.overview}</Typography>
      <Divider />
      <Fab
        aria-label="back"
        title="Back"
        color="primary"
        onClick={() => navigate("/movies")}
      >
        <ArrowBackIcon />
      </Fab>
    </div>
  );
};

export default MovieDetails;
