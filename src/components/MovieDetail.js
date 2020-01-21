import React, { Component } from 'react'
import axios from 'axios'
import '../styles/movieDetail.css'
import Loader from './Loader'

class MovieDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieData: {},
      crewData: {
        directors: [],
        characters: [],
        writers: [],
        screenplays: [],
        stories: [],
      },
      casts: [],
      videoData: [],
      loadDetail: true,
      loadCrew: true,
      loadVideo: true,
    }
  }

  lngs = {
    en: 'English',
  }

  componentDidMount() {
    const { movieId } = this.props.location.state

    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US`)
    .then( res => {
      if ( res.status === 200 && res.data) {
        this.setState({
          movieData: res.data,
          loadDetail: false,
        })
      }
    })
    .catch( err => {
      console.error(err)
    })

    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=e4621b68dcd1fa1de4a66cfd0664dc28`)
    .then( res => {
      // console.log(res)
      let directors = []
      let characters = []
      let writers = []
      let screenplays = []
      let stories = []
      let casts = []

      if (res.status === 200 && res.data) {
        for (let crew of res.data.crew) {
          if (crew.job === 'Director')
            directors.push(crew)
          else if (crew.job === 'Characters')
            characters.push(crew)
          else if(crew.job === 'Writer')
            writers.push(crew)
          else if(crew.job === 'Screenplay')
            screenplays.push(crew)
          else if(crew.job === 'Story')
            stories.push(crew)
        }

        if (res.data.cast) {
          for (let i=0; i<5; i++) {
            if (res.data.cast[i])
              casts.push(res.data.cast[i])
          }
        }

        this.setState({
          crewData: {
            directors: directors.length > 0 ? directors : [],
            characters: characters.length > 0 ? characters : [],
            writers: writers.length > 0 ? writers : [],
            screenplays: screenplays.length > 0 ? screenplays : [],
            stories: stories.length > 0 ? stories : [],
          },
          casts: casts.length > 0 ? casts : [],
          loadCrew: false,
        })
      }
    })
    .catch( err => {
      console.log(err)
    })

    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US`)
    .then( res => {
      // console.log(res)
      if (res.status === 200 && res.data) {
        this.setState({
          videoData: res.data.results,
          loadVideo: false,
        })
      }
    })
    .catch( err => {
      console.error(err)
    })
  }

  render() {
    const { 
      movieData, 
      loadDetail, 
      loadCrew,
      loadVideo,
      crewData: {directors, characters, writers, screenplays, stories}, 
      casts, 
      videoData 
    } = this.state
    // console.log({movieData})
    if (loadDetail || loadCrew || loadVideo) return (
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
                <li className="play-video" onClick={() => this.props.onShowVideo(videoData[0].key)}><span className="glyphicon glyphicon-play"></span> Play Trailer</li>
              </ul>
              <div className="md-header-overview">
                <h3>Overview</h3>
                <p>{movieData.overview}</p>
              </div>
              <div className="featured-crew">
                <h3>Featured Crew</h3>
                <div className="crew-section">
                  {
                    directors.length > 0 && 
                    <div className="crew-director crew-article">
                      <div>{directors[0].name}</div>
                      <div>{directors[0].job}</div>
                    </div>
                  }
                  {
                    writers.length > 0 && 
                    <div className="crew-writer crew-article">
                      <div>{writers[0].name}</div>
                      <div>{writers[0].job}</div>
                    </div>
                  }
                  {
                    characters.length > 0 && 
                    <div className="crew-character crew-article">
                      <div>{characters[0].name}</div>
                      <div>{characters[0].job}</div>
                    </div>
                  }
                  {
                    screenplays.length > 0 && 
                    <div className="crew-character crew-article">
                      <div>{screenplays[0].name}</div>
                      <div>{screenplays[0].job}</div>
                    </div>
                  }
                  {
                    stories.length > 0 && 
                    <div className="crew-character crew-article">
                      <div>{stories[0].name}</div>
                      <div>{stories[0].job}</div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md-main">
          <div className="md-main-content">
            <div className="content-section">
              <section className="top-cast">
                <h2>Top Cast</h2>
                <ul>
                {
                  casts.map( cast => {
                    return (
                        <li key={cast.id} className="card">
                          <img src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`} alt='' />
                          <h4>{cast.name}</h4>
                          <p>{cast.character}</p>
                        </li>
                    )
                  })
                }
                </ul>
              </section>
            </div>
          </div>
          <div className="md-main-side">
            <div className="md-main-side-content">
              <h3>Facts</h3>
              <h4>Status</h4>
              <p>{movieData.status}</p>
              <h4>Original Language</h4>
              <p>{this.lngs[movieData.original_language]}</p>
              <h4>Runtime</h4>
              <p>{`${parseInt(movieData.runtime/60)}h ${movieData.runtime % 60}m`}</p>
              <h4>Budget</h4>
              <p>{`$${(movieData.budget).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</p>
              <h4>Revenue</h4>
              <p>{`$${(movieData.revenue).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</p>
              <h4>Genres</h4>
              <div>
                {
                  movieData.genres.map( item => {
                    return (
                      <div key={item.id}>{item.name}</div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default MovieDetail