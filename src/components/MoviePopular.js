import React from 'react'
import axios from 'axios'
import '../styles/moviePopular.css'
import Pagination from './Pagination'

class MoviePopular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataMovies: [],
      totalMovies: null,
      currentPage: null,
      totalPages: null,
    }
    this.imageEp = 'https://image.tmdb.org/t/p/w185'
  }

  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US&page=1`)
    .then( res => {
      // console.log(res)
      if (res.status === 200 && res.data.results.length > 0) {
        this.setState({
          dataMovies: res.data.results,
          totalMovies: res.data.total_results,
          currentPage: res.data.page,
          totalPages: res.data.total_pages,
        })
      }
    })
    .catch( err => {
      console.error(err)
    })
  }

  onPageChanged = data => {
    const { currentPage } = data
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US&page=${currentPage}`)
    .then( res => {
      // console.log(res)
      if (res.status === 200 && res.data.results.length > 0) {
        this.setState({
          dataMovies: res.data.results,
          totalMovies: res.data.total_results,
          currentPage: res.data.page,
          totalPages: res.data.total_pages,
        })
      }
    })
    .catch( err => {
      console.log(err)
    })
  }

  render() {
    const { dataMovies, totalMovies, totalPages } = this.state
    // console.log(`totalMovies: ${totalMovies}, totalPages: ${totalPages}`)

    return (
      <div className="movie-popular-container">
        <h2>Popular Movies</h2>
        <div className="movie-popular-list">
          {
            dataMovies.length > 0 && 
            dataMovies.map( (movie, idx) => {
              return (
                <div key={movie.id} className="movie-popular-card">
                  <div className="card-image">
                    <img src={`${this.imageEp}${movie.poster_path}`} alt={`${movie.title}`} />
                  </div>
                  <div className="card-content">
                    <div className="card-content-title">{movie.title}</div>
                    <div>{movie.release_date}</div>
                    <div>{movie.overview}</div>
                    <div>More Info</div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div>
          <Pagination totalPages={totalPages} totalRecords={totalMovies} pageLimit={20} pageNeighbours={1} onPageChanged={this.onPageChanged} />
        </div>
      </div>
    )
  }
}

export default MoviePopular
