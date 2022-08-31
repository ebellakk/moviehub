import React, {useEffect, useState} from 'react';

import { useNavigate } from "react-router-dom";

import {
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
  Typography
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import useMediaQuery from '@mui/material/useMediaQuery';

import { generateImageURL } from '../util/URLResolver';


const MovieList = props => {
  const { loading, movies, rating } = props;

  const [filteredMovies, setFilteredMovies] = useState([]);
  const isLargeViewport = useMediaQuery('(min-width:769px)');

  const navigate = useNavigate();

  useEffect(() => {
    let newFilteredMovies = movies && movies.filter(movie => Math.floor(movie.vote_average) >= rating);
    setFilteredMovies(newFilteredMovies);
  }, [movies, rating]);

  const detailMovie = (id) => {
    navigate(`/movies/${id}`)
  }

  const visibleMovies = filteredMovies && filteredMovies.length > 0 ? filteredMovies : rating ? filteredMovies : movies;
  const hasVisibleMovies = visibleMovies && visibleMovies.length > 0;

  if (loading) {
    return <CircularProgress />
  }

  if (!hasVisibleMovies) {
    return (
      <div>
        <img src={`${process.env.PUBLIC_URL}/assets/images/nocontent.jpg`} alt="no result" />
        <Typography>No result</Typography>
      </div>
    )
  }

  return (
    <ImageList cols={isLargeViewport? 3 : 2}>
      {visibleMovies && visibleMovies.length > 0 && visibleMovies.map((movie) => (
        <ImageListItem key={movie.id}>
          <img src={generateImageURL(movie.poster_path)} alt={movie.name} onClick={() => detailMovie(movie.id)} />
          <ImageListItemBar
            title={movie.title}
            subtitle={<Rating name="read-only" value={Math.floor(movie.vote_average)} readOnly max={10} />}
            actionIcon={
              <Tooltip disableFocusListener title={movie.overview}>
                <IconButton aria-label={`info about ${movie.title}`} color="info">
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default MovieList;
