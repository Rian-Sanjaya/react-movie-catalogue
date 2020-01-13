import React from 'react'
import axios from 'axios'
import MovieList from './MovieList'
import Pagination from './Pagination'
import Loader from './Loader'

class MoviePopular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataMovies: [],
      totalMovies: null,
      currentPage: null,
      totalPages: null,
      load: true,
    }
  }

  componentDidMount() {
    const { baseUrl } = this.props
    
    axios.get(`${baseUrl}&page=1`)
    .then( res => {
      // console.log(res)
      if (res.status === 200 && res.data.results.length > 0) {
        this.setState({
          dataMovies: res.data.results,
          totalMovies: res.data.total_results,
          currentPage: res.data.page,
          totalPages: res.data.total_pages,
          load: false,
        })
      }
    })
    .catch( err => {
      console.error(err)
    })
  }

  onPageChanged = data => {
    const { baseUrl } = this.props

    this.setState({
      load: true,
    }, () => {
      // console.log({data: data})
      const { currentPage } = data
      axios.get(`${baseUrl}&page=${currentPage}`)
      .then( res => {
        // console.log(res)
        if (res.status === 200 && res.data.results.length > 0) {
          this.setState({
            dataMovies: res.data.results,
            totalMovies: res.data.total_results,
            currentPage: res.data.page,
            totalPages: res.data.total_pages,
            load: false,
          })
        }
      })
      .catch( err => {
        console.log(err)
      })
    })
  }

  render() {
    const { dataMovies, totalMovies, totalPages, currentPage, load } = this.state

    if (load) return (
      // <div className="loader-wrapper">
        <Loader />
      // </div>
    )

    return (
      <div className="movie-popular-container">
        <h2>Popular Movies</h2>
        <MovieList dataMovies={dataMovies} />
        <Pagination currentPage={currentPage} totalPages={totalPages} totalRecords={totalMovies} pageLimit={20} pageNeighbours={2} onPageChanged={this.onPageChanged} />
      </div>
    )
  }
}

export default MoviePopular
