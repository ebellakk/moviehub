import React, { useCallback, useEffect, useState } from "react";

import { IconButton, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { getDiscoverURL, getMovieSearchURL } from "../api";

import "../css/styles.css";

interface SearchFilterProps {
  searchCallback: (url: string) => void;
  page: number;
  setPageCallback: (page: number) => void;
}

const SearchFilter = ({
  searchCallback,
  page,
  setPageCallback,
}: SearchFilterProps) => {
  const [query, setQuery] = useState<string>("");

  const searchMovies = useCallback(
    async (query: string) => {
      const url = query ? getMovieSearchURL(query, page) : getDiscoverURL(page);
      searchCallback(url);
    },
    [page, searchCallback]
  );

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // "Enter" key
    if (e.key === "Enter") {
      searchMovies(query);
    }
  };

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
          onChange={(event) => {
            setQuery(event.target.value);
            if (!event.target.value) {
              if (page > 1) {
                searchMovies("");
              } else {
                setPageCallback(1);
              }
            }
          }}
        />
        <IconButton
          aria-label="search"
          color="success"
          onClick={() => {
            if (page > 1) {
              setPageCallback(1);
            } else {
              searchMovies(query);
            }
          }}
        >
          <SearchOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchFilter;
