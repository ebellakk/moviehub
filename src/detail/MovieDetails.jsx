import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { CircularProgress, Grid, Typography, makeStyles, Divider, ImageList, ImageListItem, Paper, ImageListItemBar, Tooltip } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ExplicitIcon from '@material-ui/icons/Explicit';
import { Rating } from '@material-ui/lab';
import { extractYear, formatRuntime } from '../util/DateUtil';
import { generateImageURL, generateIMDBURL, generateMovieDetailURL } from '../util/URLResolver';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(0.5),
    fontSize: '3rem'
  },
  info: {
    padding: theme.spacing(0.5),
    fontSize: '1.5rem'
  },
  imageListWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  okIcon: {
    color: 'rgba(0, 255, 0, 0.54)',
  },
  explicitIcon: {
    color: 'rgba(255, 0, 0, 0.54)',
  },
  fab: {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    zIndex: '9999'
  }
}));

const MovieDetails = props => {
  const classes = useStyles();

  const { uri } = useParams();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const url = generateMovieDetailURL(uri);

    const fetchData = async () => {
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

    fetchData();
  }, [uri]);

  const renderImage = (key, path, alt, title, subtitle, imdbID) => {
    return imdbID ? (
      <ImageListItem key={key}>
        <a href={generateIMDBURL(imdbID)}>
          <img src={generateImageURL(path)} alt={alt} />
          <ImageListItemBar
            title={title}
            subtitle={<span>{subtitle}</span>}
          />
        </a>
      </ImageListItem>
    ) : (
      <ImageListItem key={key}>
        <img src={generateImageURL(path)} alt={alt} />
        <ImageListItemBar
          title={title}
          subtitle={<span>{subtitle}</span>}
        />
      </ImageListItem>
    )
  }

  return (
    <div>
      {
        loading &&
        <CircularProgress />
      }
      {!loading && !movie.id &&
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/images/nocontent.jpg`} alt="no result" />
          <Typography className={classes.info}>
            No result
          </Typography>
        </div>
      }
      {!loading && movie && movie.id &&
        <div>
          <div className="imageListWrapper">
            <ImageList rowHeight={750} className={classes.imageList} cols={2}>
              {renderImage(movie.id, movie.poster_path, `${movie.title} poster`, "Poster", movie.original_title, movie.imdb_id)}
              {renderImage(movie.imdb_id, movie.backdrop_path, `${movie.title} backdrop`, "Backdrop", movie.original_title, movie.imdb_id)}
            </ImageList>
          </div>
          <Divider />
          <Paper>
            <Typography className={classes.title}> {movie.title} ({extractYear(movie.release_date)}) </Typography>
          </Paper>
          <Divider />
          <Paper>
            <Typography className={classes.info}>
              {formatRuntime(movie.runtime)}
            </Typography>
          </Paper>
          <Divider />
          <div className="imageListWrapper">
            <ImageList rowHeight={300} className={classes.imageList} cols={3}>
              {movie.production_companies && movie.production_companies.map((company) => {
                return renderImage(company.id, company.logo_path, company.name, company.name, company.origin_country)
              })}
            </ImageList>
          </div>
          <Divider />
          <Paper>
            <Grid item sm={12}>
              <Typography className={classes.info}>
                {movie.genres && movie.genres.map((genre) => genre.name).join(', ')}
              </Typography>
            </Grid>
          </Paper>
          <Divider />
          <Paper>
            <Typography className={classes.info}>
              {movie.tagline}
            </Typography>
          </Paper>
          <Divider />
          <Paper>
            <Rating name="read-only" value={Math.floor(movie.vote_average)} readOnly max={10} />
          </Paper>
          <Divider />
          <Paper>
            <Tooltip title="MPA Rating">
              <Typography className={classes.info}>
                Parental Guide:
                <IconButton aria-label={`info about ${movie.title}`} className={movie.adult ? classes.explicitIcon : classes.okIcon}>
                  {movie.adult && <ExplicitIcon />}
                  {!movie.adult && <CheckCircleIcon />}
                </IconButton>
              </Typography>
            </Tooltip>
          </Paper>
          <Divider />
          <Paper>
            <Grid item sm={12}>
              <Typography className={classes.info}>
                {movie.overview}
              </Typography>
            </Grid>
          </Paper>
        </div>
      }
      <div className={classes.fab}>
        <Grid container justify="space-between" spacing={1}>
          <Grid item xs={1}>
            <Fab
              aria-label="back"
              title="Back"
              color="primary"
              onClick={() => history.push('/movies')}
            >
              <ArrowBackIcon />
            </Fab>
          </Grid>
        </Grid>
      </div>
    </div >
  );
};

export default MovieDetails;
