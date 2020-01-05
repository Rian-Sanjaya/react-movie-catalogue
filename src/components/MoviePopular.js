import React from 'react'
import axios from 'axios'
import MovieList from './MovieList'
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
        <MovieList dataMovies={dataMovies} />
        <Pagination totalPages={totalPages} totalRecords={totalMovies} pageLimit={20} pageNeighbours={2} onPageChanged={this.onPageChanged} />
      </div>
    )
  }
}

export default MoviePopular
