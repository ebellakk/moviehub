import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  CircularProgress,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
  Typography
} from '@mui/material';
import Fab from '@mui/material/Fab';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExplicitIcon from '@mui/icons-material/Explicit';

import { extractYear, formatRuntime } from '../util/DateUtil';
import { generateImageURL, generateIMDBURL } from '../util/URLResolver';
import { getMovieDetailURL } from './api';

const MovieDetails = props => {

  const isLargeViewport = useMediaQuery('(min-width:769px)');

  const { uri } = useParams();

  const [movie, setMovie] = useState({});
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

  const renderImage = (key, path, alt, title, subtitle, imdbID) => {
    return imdbID ? (
      <ImageListItem key={key}>
        <a href={generateIMDBURL(imdbID)}>
          <img src={generateImageURL(path)} alt={alt} />
          <ImageListItemBar
            title={title}
            subtitle={<span>{subtitle}</span>}
          />
        </a>
      </ImageListItem>
    ) : (
      <ImageListItem key={key}>
        <img src={generateImageURL(path)} alt={alt} />
        <ImageListItemBar
          title={title}
          subtitle={<span>{subtitle}</span>}
        />
      </ImageListItem>
    )
  }

  if (loading) {
    return <CircularProgress />
  }

  if (!movie.id) {
    <div>
      <img src={`${process.env.PUBLIC_URL}/assets/images/nocontent.jpg`} alt="no result" />
      <Typography>No result</Typography>
    </div>
  }

  return (
    <div>
      <ImageList cols={isLargeViewport? 2 : 1}>
        {renderImage(movie.id, movie.poster_path, `${movie.title} poster`, "Poster", movie.original_title, movie.imdb_id)}
        {renderImage(movie.imdb_id, movie.backdrop_path, `${movie.title} backdrop`, "Backdrop", movie.original_title, movie.imdb_id)}
      </ImageList>
      <Divider />
      <Typography variant="h1">{movie.title} ({extractYear(movie.release_date)})</Typography>
      <Divider />
      <Typography variant="h2">{formatRuntime(movie.runtime)}</Typography>
      <Divider />
      <ImageList cols={isLargeViewport? 3 : 2}>
        {movie.production_companies && movie.production_companies.map((company) => {
          return renderImage(company.id, company.logo_path, company.name, company.name, company.origin_country)
        })}
      </ImageList>
      <Divider />
      <Typography>{movie.genres && movie.genres.map((genre) => genre.name).join(', ')}</Typography>
      <Divider />
      <Typography>{movie.tagline}</Typography>
      <Divider />
      <Rating name="read-only" value={Math.floor(movie.vote_average)} readOnly max={10} />
      <Divider />
      <Tooltip title="MPA Rating">
        <Typography>
          Parental Guide:
          <IconButton aria-label={`info about ${movie.title}`} color={movie.adult? "error" : "success"}>
            {movie.adult? <ExplicitIcon /> : <CheckCircleIcon />}
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
        onClick={() => navigate('/movies')}
      >
        <ArrowBackIcon />
      </Fab>
    </div >
  );
};

export default MovieDetails;
