import React, { useEffect, useState } from 'react';

import { Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Rating } from '@material-ui/lab';
import { generateDiscoverURL, generateMovieSearchURL } from '../util/URLResolver';
import MovieList from './MovieList';

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
  },
  redIcon: {
    color: 'rgba(255, 0, 0, 0.54)',
  }
}));

const Discover = props => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [rating, setRating] = useState(0);

  const fetchMovies = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      setMovies(json.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const url = generateDiscoverURL();
    fetchMovies(url);
  }, []);

  const searchMovies = async (query) => {
    const url = query ? generateMovieSearchURL(query) : generateDiscoverURL();
    fetchMovies(url);
  }

  const filterByRating = (rating) => {
    let newFilteredMovies = movies && movies.filter(movie => Math.floor(movie.vote_average) >= (rating * 2) - 2 && Math.floor(movie.vote_average) <= rating * 2);
    setFilteredMovies(newFilteredMovies);
  }

  const handleRatingFilter = (newRating) => {
    if (!newRating || rating === newRating) {
      setRating(0);
      setFilteredMovies([]);
      return;
    }
    setRating(newRating);
    filterByRating(newRating);
  }

  const handleEnterKey = e => {
    // "Enter" key
    if (e.keyCode === 13) {
      searchMovies(query);
    }
  };

  return (
    <div>
      <div className="searchWrapper" onKeyDown={handleEnterKey}>
        <Paper>
          <TextField
            type="search"
            placeholder="Search..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <IconButton aria-label={`search`} className={classes.redIcon}>
            <SearchIcon onClick={() => searchMovies(query)} />
          </IconButton>
        </Paper>
        <Paper>
          <Rating
            value={rating}
            max={5}
            onChange={(event, newValue) => {
              handleRatingFilter(newValue);
            }} />
        </Paper>
      </div>
      <MovieList movies={movies} filteredMovies={filteredMovies} rating={rating} loading={loading} />
    </div>
  );
};

export default Discover;
