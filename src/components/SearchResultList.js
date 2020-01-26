import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { stringTruncate } from '../helper/stringHelper'

class SearchResultList extends Component {
  constructor(props) {
    super(props)

    this.imageEp = 'https://image.tmdb.org/t/p/w185'
  }

  render() {
    const { lists, parentComponent } = this.props
    // console.log(lists)

    if (lists.length === 0) return null

    return (
      <div className="search-result-list">
        {
          lists.map( (movie, idx) => {
            let title = '', release_date = ''

            if (movie.title)
              title = movie.title
            else if (movie.name)
              title = movie.name

            if (movie.release_date) 
              release_date = movie.realease_date
            else if (movie.first_air_date)
              release_date = movie.first_air_date

            return (
              <div key={movie.id} className="search-result-card">
                <div className="card-image">
                  <Link to={{
                    pathname: '/movie/detail',
                    state: {
                      movieId: movie.id,
                      parentComponent: parentComponent
                    }
                  }}>
                    <img src={`${this.imageEp}${movie.poster_path}`} alt={`${title}`} />
                  </Link>
                </div>
                <div className="search-result-content">
                  <div className='search-result-content-header'>
                    <div className="search-result-movie-rate">
                      {movie.vote_average * 10 + '%'}
                    </div>
                    <div className="search-result-movie-title">
                      <Link to={{
                        pathname: '/movie/detail',
                        state: {
                          movieId: movie.id,
                          parentComponent: parentComponent
                        }
                      }}>
                        <div className="search-result-content-title">{title}</div>
                      </Link>
                      <div className="search-result-movie-release-date">{moment(release_date, 'YYYY-MM-DD').format('MMMM D, YYYY')}</div>
                    </div>
                  </div>
                  {
                    (parentComponent === 'tvshows' || parentComponent === 'movies') &&
                    <Fragment>
                      <div className="search-result-movie-overview">{stringTruncate(movie.overview, 200)}</div>
                      <Link to={{
                        pathname: '/movie/detail',
                        state: {
                          movieId: movie.id,
                          parentComponent: parentComponent
                        }
                      }}>
                        <div className="search-result-movie-more-info">More Info</div>
                      </Link>
                    </Fragment>
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default SearchResultList