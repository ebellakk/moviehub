import React from 'react';

import { useNavigate } from "react-router-dom";

import { CircularProgress, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, Rating, Tooltip, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import InfoIcon from '@mui/icons-material/Info';
import { generateImageURL } from '../util/URLResolver';


const MovieList = props => {
  const { movies, filteredMovies, rating, loading } = props;
  const isLargeViewport = useMediaQuery('(min-width:769px)');

  const navigate = useNavigate();

  const detailMovie = (id) => {
    navigate(`/movies/${id}`)
  }

  const visibleMovies = filteredMovies && filteredMovies.length > 0 ? filteredMovies : rating ? filteredMovies : movies;
  const hasVisibleMovies = visibleMovies && visibleMovies.length > 0;

  return (
    <div>
      {
        loading &&
        <CircularProgress />
      }
      {!loading && !hasVisibleMovies &&
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/images/nocontent.jpg`} alt="no result" />
          <Typography>
            No result
          </Typography>
        </div>}
      {!loading && hasVisibleMovies &&
        <Paper>
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
        </Paper>
      }
    </div>
  );
};

export default MovieList;
