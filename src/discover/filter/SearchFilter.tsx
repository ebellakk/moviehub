import React, { useState } from "react";
import PropTypes from "prop-types";

import { IconButton, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { getDiscoverURL, getMovieSearchURL } from "../api";

import "../css/styles.css";

const SearchFilter = (props) => {
  const { searchCallback } = props;

  const [query, setQuery] = useState("");

  const searchMovies = async (query) => {
    const url = query ? getMovieSearchURL(query) : getDiscoverURL();
    searchCallback(url);
  };

  const handleEnterKey = (e) => {
    // "Enter" key
    if (e.keyCode === 13) {
      searchMovies(query);
    }
  };

  return (
    <div onKeyDown={handleEnterKey}>
      <div className="moviehub-centered">
        <TextField
          type="search"
          placeholder="Search..."
          onChange={(event) => {
            setQuery(event.target.value);
            if (!event.target.value) {
              searchMovies("");
            }
          }}
        />
        <IconButton
          aria-label="search"
          color="success"
          onClick={() => searchMovies(query)}
        >
          <SearchOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

SearchFilter.propTypes = {
  searchCallback: PropTypes.func.isRequired,
};

export default SearchFilter;
