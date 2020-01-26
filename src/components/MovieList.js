import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { stringTruncate } from '../helper/stringHelper'
import '../styles/movieList.css'

class MovieList extends Component {
  constructor(props) {
    super(props)

    this.imageEp = 'https://image.tmdb.org/t/p/w185'
  }

  render() {
    const { dataMovies, parentComponent } = this.props
    // console.log(dataMovies)

    if (dataMovies.length === 0) return null

    return (
      <div className="movie-popular-list">
        {
          dataMovies.map( (movie, idx) => {

            let title, release_date

            switch(parentComponent) {
              case 'movies':
                title =  movie.title
                release_date = movie.release_date
                break

              case 'tvshows':
                title = movie.name
                release_date = movie.first_air_date
                break

              default:
                title = ''
            }

            return (
              <div key={movie.id} className="movie-popular-card">
                <div className="card-image">
                  <Link to={{ 
                    pathname: "/movie/detail",
                    state: {
                      movieId: movie.id,
                      parentComponent: parentComponent
                    }
                  }}>
                    <img src={`${this.imageEp}${movie.poster_path}`} alt={`${movie.title}`} />
                  </Link>
                </div>
                <div className="card-content">
                  <div className='card-content-header'>
                    <div className="movie-rate">
                      {movie.vote_average * 10 + '%'}
                    </div>
                    <div className="movie-title">
                      <Link 
                        to={{
                          pathname: "/movie/detail",
                          state: {
                            movieId: movie.id,
                            parentComponent: parentComponent
                          }
                        }}
                        className="card-content-title"
                      >
                        {title}
                      </Link>
                      <div className="movie-release-date">{moment(release_date, 'YYYY-MM-DD').format('MMMM D, YYYY')}</div>
                    </div>
                  </div>
                  <div className="movie-overview">{stringTruncate(movie.overview, 200)}</div>
                  <div className="movie-more-info">
                    <Link 
                      to={{
                        pathname: "/movie/detail",
                        state: {
                          movieId: movie.id,
                          parentComponent: parentComponent
                        }
                      }}
                    >
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default MovieList