import React, { useEffect, useState } from "react";

import { CircularProgress, ImageList, Slide } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Movie } from "../../detail/types/movie";

import { NoContent } from "../../common/components/noContent/NoContent";
import { MovieCard } from "./movieCard/MovieCard";

interface MovieListProps {
  loading: boolean;
  movies: Movie[];
  rating: number;
}

export const MovieList = ({ loading, movies, rating }: MovieListProps) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const isLargeViewport = useMediaQuery("(min-width:769px)");

  useEffect(() => {
    let newFilteredMovies = movies?.filter(
      (movie) => Math.floor(movie.vote_average) >= rating
    );
    setFilteredMovies(newFilteredMovies);
  }, [movies, rating]);

  const visibleMovies =
    filteredMovies && filteredMovies.length > 0
      ? filteredMovies
      : rating
      ? filteredMovies
      : movies;
  const hasVisibleMovies = visibleMovies?.length > 0;

  if (loading) {
    return <CircularProgress />;
  }

  if (!hasVisibleMovies) {
    return <NoContent />;
  }

  return (
    <Slide in={hasVisibleMovies} direction="left">
      <ImageList cols={isLargeViewport ? 3 : 2}>
        {visibleMovies?.map((movie) => (
          <MovieCard {...movie} key={movie.id} />
        ))}
      </ImageList>
    </Slide>
  );
};
