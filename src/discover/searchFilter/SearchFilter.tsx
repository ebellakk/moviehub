import React, { useCallback, useEffect } from "react";

import { IconButton, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import useMovieFilterStore from "../../store/filter/MovieFilterStore";
import { getDiscoverURL, getMovieSearchURL } from "../api";

import "../css/styles.css";

interface SearchFilterProps {
  searchCallback: (url: string) => void;
}

const SearchFilter = ({ searchCallback }: SearchFilterProps) => {
  const movieFilterStore = useMovieFilterStore();
  const { page, query, setQuery, setPage, setRating } = movieFilterStore;

  const searchMovies = useCallback(
    async (query: string) => {
      const url = query ? getMovieSearchURL(query, page) : getDiscoverURL(page);
      searchCallback(url);
    },
    [page, searchCallback]
  );

  const refreshMovies = useCallback(
    (query: string) => {
      if (page === 1) {
        searchMovies(query);
      } else {
        setPage(1);
      }
    },
    [page, searchMovies, setPage]
  );

  const handleEnterKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // "Enter" key
      if (e.key === "Enter") {
        refreshMovies(query);
      }
    },

    [refreshMovies, query]
  );

  useEffect(() => {
    searchMovies(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchMovies]);

  return (
    <div onKeyDown={handleEnterKey}>
      <div className="moviehub-centered">
        <TextField
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            if (!event.target.value) {
              setRating(0);
              refreshMovies("");
            }
          }}
        />
        <IconButton
          aria-label="search"
          color="success"
          onClick={() => {
            refreshMovies(query);
          }}
        >
          <SearchOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchFilter;
