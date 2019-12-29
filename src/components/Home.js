import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActions'
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "react-multi-carousel/lib/styles.css";
import '../styles/home.css'

const useStyles = makeStyles({
  cont: {
    flexDirection: 'column',
    padding: 0,
  },
  card: {
    margin: "0 10px",
    height: 250,
    boxShadow: '4px 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  media: {
    height: 160,
    width: '100%',
  },
  typo: {
    fontSize: '0.8rem',
  }
})

function Home(props) {
  const classes = useStyles()
  
  const { navShrink } = props
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const slider1 = [
    {
      image: "/images/starwars9-w500.jpg",
      imgTitle: "Star Wars: The Rise of Skywalker",
      title: "Star Wars: The Rise of Skywalker",
    },
    {
      image: "/images/ipman4.jpg",
      imgTitle: "Ip Man 4: The Finale",
      title: "Ip Man 4: The Finale",
    },
    {
      image: "/images/jumanji.jpg",
      imgTitle: "Jumanji: The Next Level",
      title: "Jumanji: The Next Level",
    },
    {
      image: "/images/frozen2.jpg",
      imgTitle: "Frozen II",
      title: "Frozen II",
    },
    {
      image: "/images/zombieland2.jpg",
      imgTitle: "Zombieland: Double Tap",
      title: "Zombieland: Double Tap",
    },
  ]

  return (
    <div className="home-container">
      <div className={navShrink ? "hero-container shrink" : "hero-container"}>
        <div className="hero-image">
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
        >
          {
            slider1.map( (item, idx) => {
              return (
                <Card key={idx} className={classes.card}>
                  <CardActionArea className={classes.cont}>
                    <CardMedia
                      className={classes.media}
                      image={item.image}
                      title={item.imgTitle}
                    />
                    <CardContent>
                      <Typography className={classes.typo}>
                        <Link to="/" className="slider-link">{item.title}</Link>
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
        <Carousel responsive={responsive} className="carousel-container" >
          {
            slider1.map( (item, idx) => {
              return (
                <Card key={idx} className={classes.card}>
                  <CardActionArea className={classes.cont}>
                    <CardMedia
                      className={classes.media}
                      image={item.image}
                      title={item.imgTitle}
                    />
                    <CardContent>
                      <Typography className={classes.typo}>
                        <Link to="/" className="slider-link">{item.title}</Link>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            })
          }
        </Carousel>
      </div>
      <div className="footer">
        <p className="footer-title">Movie<br/>Catalogue</p>
        <p className="footer-desc">API from&nbsp;&nbsp;&nbsp;
          <a className="slider-link" href="https://www.themoviedb.org/" target="_blank" 
          rel="noopener noreferrer">
            <img src="/images/themoviedb.svg" alt="the movie db logo" 
            width={50} style={{ verticalAlign: 'middle' }} />
          </a>
        </p>
      </div>
    </div>
  )

}

export default Home