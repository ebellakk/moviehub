import React, { useCallback, useState } from "react";

import { Rating } from "@mui/material";

import { Movie } from "../detail/types/movie";
import useMovieFilterStore from "../store/filter/MovieFilterStore";

import { MovieList } from "./movieList/MovieList";
import { SearchFilter } from "./searchFilter/SearchFilter";
import { PaginationButton } from "./pagination/PaginationButton";

import "./css/styles.css";
import { TMDBCredit } from "../common/components/tmdb/TMDBCredit";

export const Discover = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const movieFilterStore = useMovieFilterStore();
  const { page, setPage, setPreviousPage, rating, setRating } = movieFilterStore;

  const fetchMovies = useCallback(async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      setMovies(json.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
      {!loading && (
        <>
          <PaginationButton
            onClickCallback={() => {
              if (page > 1) {
                setPreviousPage(page);
                setPage(page - 1);
              }
            }}
            type="backward"
            disabled={page === 1}
          />
          <PaginationButton
            onClickCallback={() => {
              setPreviousPage(page);
              setPage(page + 1);
            }}
            type="forward"
          />
        </>
      )}
      <TMDBCredit />
    </div>
  );
};
