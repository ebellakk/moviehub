import React from 'react';

import { useHistory } from "react-router-dom";

import { CircularProgress, Paper, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Rating } from '@material-ui/lab';
import { generateImageURL } from '../util/URLResolver';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(0.5),
    fontSize: '3rem'
  },
  info: {
    padding: theme.spacing(0.5),
    fontSize: '1.5rem'
  },
  imageListWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }
}));

const MovieList = props => {
  const { movies, filteredMovies, rating, loading } = props;
  const classes = useStyles();

  const history = useHistory();

  const detailMovie = (id) => {
    history.push(`/movies/${id}`)
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
          <Typography className={classes.info}>
            No result
          </Typography>
        </div>}
      {!loading && hasVisibleMovies &&
        <div className={classes.imageListWrapper}>
          <Paper>
            <ImageList rowHeight={300} className={classes.imageList} cols={3}>
              {visibleMovies && visibleMovies.length > 0 && visibleMovies.map((movie) => (
                <ImageListItem key={movie.id}>
                  <img src={generateImageURL(movie.poster_path)} alt={movie.name} onClick={() => detailMovie(movie.id)} />
                  <ImageListItemBar
                    title={movie.title}
                    subtitle={<Rating name="read-only" value={Math.floor(movie.vote_average)} readOnly max={10} />}
                    actionIcon={
                      <Tooltip disableFocusListener title={movie.overview}>
                        <IconButton aria-label={`info about ${movie.title}`} className={classes.icon}>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Paper>
        </div>
      }
    </div>
  );
};

export default MovieList;
