import React, { useEffect, useState } from "react";

import { Rating } from "@mui/material";

import { getDiscoverURL } from "./api";

import MovieList from "./movieList/MovieList";
import SearchFilter from "./filter/SearchFilter";

import "./css/styles.css";

import { Movie } from "../detail/types/movie";

const Discover = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [rating, setRating] = useState<number>(0);

  const fetchMovies = async (url: string) => {
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

  const handleRatingFilter = (newRating: number) => {
    if (!newRating || rating === newRating) {
      setRating(0);
      return;
    }
    setRating(newRating);
  };

  return (
    <div>
      <SearchFilter searchCallback={fetchMovies} />
      <div className="moviehub-rating-filter">
        <Rating
          name="rating"
          value={rating}
          max={10}
          onChange={(_, newValue: number) => {
            handleRatingFilter(newValue);
          }}
        />
      </div>
      <MovieList movies={movies} rating={rating} loading={loading} />
    </div>
  );
};

export default Discover;
