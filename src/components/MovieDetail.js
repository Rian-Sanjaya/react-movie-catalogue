import React, { Component } from 'react'
import axios from 'axios'
import '../styles/movieDetail.css'
import Loader from './Loader'

class MovieDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieData: {},
      load: true,
    }
  }

  componentDidMount() {
    const { movieId } = this.props.location.state

    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US`)
    .then( res => {
      console.log(res)
      if ( res.status === 200 && res.data) {
        this.setState({
          movieData: res.data,
          load: false,
        })
      }
    })
    .catch( err => {
      console.error(err)
    })
  }

  render() {
    const { movieData, load } = this.state
    
    if (load) return (
      <Loader />
    )

    // backgroundImage: `radial-gradient(circle at 20% 50%, rgba(18.04%, 9.41%, 23.14%, 0.98) 0%, rgba(25.10%, 15.69%, 30.59%, 0.88) 100%), url(https://image.tmdb.org/t/p/w1400_and_h450_face${movieData.backdrop_path})`
    // https://image.tmdb.org/t/p/w1400_and_h450_face/jOzrELAzFxtMx2I4uDGHOotdfsS.jpg
    return (
      <div className="md-wrapper">
        <div className="md-header-container" 
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(18.04%, 9.41%, 23.14%, 0.98) 0%, rgba(25.10%, 15.69%, 30.59%, 0.88) 100%), url(https://image.tmdb.org/t/p/w1400_and_h450_face${movieData.backdrop_path})`
          }}
        >
          <div className="md-header">
            <div className="md-header-poster"
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w185${movieData.poster_path})` }}
            >
            </div>
            <div className="md-header-content">
              <h2>{movieData.original_title}</h2>
              <p>{`(${(movieData.release_date).substr(0, 4)})`}</p>
              <ul className="md-header-score">
                <li>
                  <div>{`${movieData.vote_average * 10}%`}</div>
                  <div><p>User<br/>Score</p></div>
                </li>
                <li><span className="glyphicon glyphicon-play"></span> Play Trailer</li>
              </ul>
              <div className="md-header-overview">
                <h3>Overview</h3>
                <p>{movieData.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieDetail