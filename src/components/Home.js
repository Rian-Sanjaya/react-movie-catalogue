import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Carousel from "react-multi-carousel";
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActions'
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "react-multi-carousel/lib/styles.css";
import '../styles/home.css'
import Loader from './Loader'

const styles = theme => ({
  cont: {
    flexDirection: 'column',
    padding: 0,
  },
  card: {
    margin: "0 10px",
    height: 445,
    boxShadow: '4px 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  media: {
    height: 365,
    width: '100%',
    backgroundSize: 'cover',
  },
  typo: {
    fontSize: '0.8rem',
  }
})

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newMovies: [],
      newTvShows: [],
      loadMovies: true,
      loadTv: true,
    }

    this.imageEp = 'https://image.tmdb.org/t/p/w185'
  }

  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
    .then( res => {
      const results = res.data.results
      if (results.length > 0) {
        this.setState({
          newMovies: results,
          loadMovies: false,
        })
      }
    })
    .catch( err => {
      console.error(err)
    })

    axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
    .then( res => {
      const results = res.data.results
      if (results.length > 0) {
        this.setState({
          newTvShows: results,
          loadTv: false,
        })
      }
    })
    .catch( err => {
      console.error(err)
    })
  }

  render() {
    const { navShrink, classes } = this.props
    const { newMovies, newTvShows, loadMovies, loadTv } = this.state

    // const responsive = {
    //   superLargeDesktop: {
    //     // the naming can be any, depends on you.
    //     breakpoint: { max: 4000, min: 3000 },
    //     items: 5,
    //   },
    //   desktop: {
    //     breakpoint: { max: 3000, min: 1110 },
    //     items: 3,
    //   },
    //   tablet: {
    //     breakpoint: { max: 1110, min: 555 },
    //     items: 2,
    //   },
    //   mobile: {
    //     breakpoint: { max: 555, min: 0 },
    //     items: 1,
    //   },
    // };
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1100 },
        items: 4,
      },
      tablet: {
        breakpoint: { max: 1100, min: 550 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 550, min: 0 },
        items: 1,
      },
    };

    if (loadMovies || loadTv) return (
      // <div className="loader-wrapper">
        <Loader />
      // </div>
    )

    console.log(newMovies)

    return (
      <div className="home-container">
        <div className={navShrink ? "hero-container shrink" : "hero-container"}>
          <div 
            className="hero-image" 
            style={{ 
              // background: newMovies.length > 0 
              //   ? `linearGradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(https://image.tmdb.org/t/p/w185${newMovies[0].poster_path})` 
              //   : '' 
              backgroundImage: `url(https://image.tmdb.org/t/p/w185${newMovies[0].backdrop_path})`
            }}
          >
            <div className="hero-content">
              <div className="hero-title">Movie Catalogue</div>
              <div className="hero-desc">Your Movies and TV Shows Info</div>
            </div>
          </div>
        </div>
        <div className="slider1-container">
          <p className="new-movies">New Movies</p>
          <Carousel 
            responsive={responsive} 
            className="carousel-container" 
            containerClass="container-with-dots"
            sliderClass="slider-class"
            itemClass="item-class"
            dotListClass="dot-list-clas"
            showDots
            autoPlay
            infinite
          >
            {
              newMovies.length > 0 &&
              newMovies.map( (movie, idx) => {
                return (
                  <Card key={movie.id} className={classes.card}>
                    <CardActionArea className={classes.cont}>
                      <CardMedia
                        className={classes.media}
                        image={`${this.imageEp}${movie.poster_path}`}
                        title={movie.title}
                      />
                      <CardContent>
                        <Typography className={classes.typo}>
                          <Link to="/" className="slider-link">{movie.title}</Link>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              })
            }
          </Carousel>
        </div>
        <div className="slider1-container last">
          <p className="new-movies">New TV Shows</p>
          <Carousel 
            responsive={responsive} 
            className="carousel-container" 
            showDots
            autoPlay
            infinite
          >
            {
              newTvShows.length > 0 &&
              newTvShows.map( (movie, idx) => {
                return (
                  <Card key={movie.id} className={classes.card}>
                    <CardActionArea className={classes.cont}>
                      <CardMedia
                        className={classes.media}
                        image={`${this.imageEp}${movie.poster_path}`}
                        title={movie.name}
                      />
                      <CardContent>
                        <Typography className={classes.typo}>
                          <Link to="/" className="slider-link">{movie.name}</Link>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              })
            }
          </Carousel>
        </div>
        {/* <div className="footer">
          <p className="footer-title">Movie<br/>Catalogue</p>
          <p className="footer-desc">API from&nbsp;&nbsp;&nbsp;
            <a className="slider-link" href="https://www.themoviedb.org/" target="_blank" 
            rel="noopener noreferrer">
              <img src="/images/themoviedb.svg" alt="the movie db logo" 
              width={50} style={{ verticalAlign: 'middle' }} />
            </a>
          </p>
        </div> */}
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)