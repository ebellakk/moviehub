import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import MovieDetails from './detail/MovieDetails';
import Discover from './discover/Discover';

function App() {
  return (
    <Router>
      <div className="MovieHub" >
        <Switch>
          <Route exact path="/" children={<Discover />} />
          <Route exact path="/movies" children={<Discover />} />
          <Route path="/movies/:uri" children={<MovieDetails />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
