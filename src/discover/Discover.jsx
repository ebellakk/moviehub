import React, { useEffect, useState } from 'react';

import {
  Rating,
} from '@mui/material';

import { getDiscoverURL } from './api';

import MovieList from './movieList/MovieList';
import SearchFilter from './filter/SearchFilter';

import './css/styles.css'

const Discover = props => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
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

  const handleRatingFilter = (newRating) => {
    if (!newRating || rating === newRating) {
      setRating(0);
      return;
    }
    setRating(newRating);
  }

  return (
    <div>
      <SearchFilter searchCallback={fetchMovies} />
      <div className="moviehub-rating-filter" >
        <Rating
          name="rating"
          value={rating}
          max={10}
          onChange={(event, newValue) => {
            handleRatingFilter(newValue);
          }} />
      </div>
      <MovieList movies={movies} rating={rating} loading={loading} />
    </div>
  );
};

export default Discover;
