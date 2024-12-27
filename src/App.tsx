import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

import { MovieDetails } from "./detail/MovieDetails";
import { Discover } from "./discover/Discover";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="moviehub">
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/movies" element={<Discover />} />
            <Route path="/movies/:uri" element={<MovieDetails />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
