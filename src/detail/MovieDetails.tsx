import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CircularProgress, Divider } from "@mui/material";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { getMovieDetailURL } from "./api";
import { Movie } from "./types/movie";

import { NoContent } from "../common/components/noContent/NoContent";
import { Posters } from "./posters/Posters";
import { MovieBasicInfo } from "./basicInfo/MovieBasicInfo";
import { ProductionCompanies } from "./productionCompanies/ProductionCompanies";
import { MovieRating } from "./movieRating/MovieRating";

export const MovieDetails = () => {
  const { uri } = useParams();

  const [movie, setMovie] = useState<Movie>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) {
    return <CircularProgress />;
  }

  if (!movie?.id) {
    return (
      <div>
        <NoContent />
        <Fab
          aria-label="back"
          title="Back"
          color="primary"
          onClick={() => navigate("/movies")}
        >
          <ArrowBackIcon />
        </Fab>
      </div>
    );
  }

  return (
    <div>
      <Posters {...movie} />
      <Divider />
      <MovieBasicInfo {...movie} />
      <Divider />
      <MovieRating voteAverage={movie.vote_average} />
      <Divider />
      <ProductionCompanies productionCompanies={movie.production_companies} />
      <Fab
        aria-label="back"
        title="Back"
        color="primary"
        style={{
          position: "sticky",
          bottom: "1rem",
          float: "right",
          marginRight: "1rem",
        }}
        onClick={() => navigate("/movies")}
      >
        <ArrowBackIcon />
      </Fab>
    </div>
  );
};
