import React, { useEffect, useState } from 'react';

import {
  IconButton,
  Rating,
  TextField
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { getDiscoverURL, getMovieSearchURL } from './api';
import MovieList from './MovieList';

import './css/styles.css'

const Discover = props => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
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
    const url = getDiscoverURL();
    fetchMovies(url);
  }, []);

  const searchMovies = async (query) => {
    const url = query ? getMovieSearchURL(query) : getDiscoverURL();
    fetchMovies(url);
  }

  const handleRatingFilter = (newRating) => {
    if (!newRating || rating === newRating) {
      setRating(0);
      return;
    }
    setRating(newRating);
  }

  const handleEnterKey = e => {
    // "Enter" key
    if (e.keyCode === 13) {
      searchMovies(query);
    }
  };

  return (
    <div>
      <div onKeyDown={handleEnterKey}>
        <div className='moviehub-centered'>
          <TextField
            type="search"
            placeholder="Search..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <IconButton aria-label={`search`} color="success" onClick={() => searchMovies(query)}>
            <SearchOutlinedIcon />
          </IconButton>
        </div>
        <div className="moviehub-rating-filter" >
          <Rating
            name="rating"
            value={rating}
            max={10}
            onChange={(event, newValue) => {
              handleRatingFilter(newValue);
            }} />
        </div>
      </div>
      <MovieList movies={movies} rating={rating} loading={loading} />
    </div>
  );
};

export default Discover;
