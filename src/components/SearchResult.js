import React, { Component, Fragment } from 'react'
import axios from 'axios'
import '../styles/searchResult.css'
import SearchResultList from './SearchResultList'
import Pagination from './Pagination'
import Loader from './Loader'

class SearchResult extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentList: 'tvshows',
      tvShows: {
        lists: [],
        totalResults: null,
        currentPage: null,
        totalPages: null,
      },
      movies: {
        lists: [],
        totalResults: null,
        currentPage: null,
        totalPages: null,
      },
      people: {
        lists: [],
        totalResults: null,
        currentPage: null,
        totalPages: null,
      },
      load: true,
    }

    this.query = this.props.location.state.keywords
    this.title = ''
    this.lists = []
    this.totalPages = null
    this.currentPage = null
    this.totalResults = null
  }

  componentDidMount() {
    if (this.query && this.query !== '') {
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US&query=${this.query}&page=1`)
      .then( res => {
        this.setState( curState => {
          return ({
            tvShows: {
              currentPage: res.data.page,
              totalResults: res.data.total_results,
              totalPages: res.data.total_pages,
              lists: res.data.results,
            }
          })
        })
      })
      .catch( err => {
        console.error(err)
      })

      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US&query=${this.query}&page=1&include_adult=false`)
      .then( res => {
        this.setState( curState => {
          return ({
            movies: {
              currentPage: res.data.page,
              totalResults: res.data.total_results,
              totalPages: res.data.total_pages,
              lists: res.data.results,
            }
          })
        })
      })
      .catch( err => {
        console.error(err)
      })

      axios.get(`https://api.themoviedb.org/3/search/person?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US&query=${this.query}&page=1&include_adult=false`)
      .then( res => {
        this.setState( curState => {
          return ({
            people: {
              currentPage: res.data.page,
              totalResults: res.data.total_results,
              totalPages: res.data.total_pages,
              lists: res.data.results,
            },
            load: false,
          })
        })
      })
      .catch( err => {
        console.error(err)
      })
    }
  }

  onPageChanged = (data) => {
    this.setState({
      load: true,
    }, () => {
      const { currentPage } = data
      // console.log(`currentPage: ${currentPage}`)
      switch(this.state.currentList) {
        case 'tvshows':
          axios.get(`https://api.themoviedb.org/3/search/tv?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US&query=${this.query}&page=${currentPage}`)
          .then( res => {
            // console.log(res)
            if (res.status === 200 && res.data.results.length > 0) {
              this.setState({
                tvShows: {
                  currentPage: res.data.page,
                  totalResults: res.data.total_results,
                  totalPages: res.data.total_pages,
                  lists: res.data.results,
                },
                load: false,
              })
            }
          })
          .catch( err => {
            console.log(err)
          })
          break

        case 'movies':
          axios.get(`https://api.themoviedb.org/3/search/movie?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US&query=${this.query}&page=${currentPage}&include_adult=false`)
          .then( res => {
            // console.log(res)
            if (res.status === 200 && res.data.results.length > 0) {
              this.setState({
                movies: {
                  currentPage: res.data.page,
                  totalResults: res.data.total_results,
                  totalPages: res.data.total_pages,
                  lists: res.data.results,
                },
                load: false,
              })
            }
          })
          .catch( err => {
            console.log(err)
          })
          break

        case 'people':
          axios.get(`https://api.themoviedb.org/3/search/person?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US&query=${this.query}&page=${currentPage}&include_adult=false`)
          .then( res => {
            // console.log(res)
            if (res.status === 200 && res.data.results.length > 0) {
              this.setState( curState => {
                return ({
                  people: {
                    currentPage: res.data.page,
                    totalResults: res.data.total_results,
                    totalPages: res.data.total_pages,
                    lists: res.data.results,
                  },
                  load: false,
                })
              })
            }
          })
          .catch( err => {
            console.error(err)
          })
          break

        default:
          axios.get(`https://api.themoviedb.org/3/search/tv?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US&query=${this.query}&page=${currentPage}`)
          .then( res => {
            // console.log(res)
            if (res.status === 200 && res.data.results.length > 0) {
              this.setState({
                tvShows: {
                  currentPage: res.data.page,
                  totalResults: res.data.total_results,
                  totalPages: res.data.total_pages,
                  lists: res.data.results,
                },
                load: false,
              })
            }
          })
          .catch( err => {
            console.log(err)
          })
      }
    })
  }

  handleSidebarMenuClick = (menu, e) => {
    // console.log(`menu: ${menu}`)
    // console.log({event: e})

    this.setState({
      currentList: menu
    })
  }

  render() {
    // console.log(this.state.tvShows)

    const { currentList, tvShows, movies, people, load } = this.state

    switch(true) {
      case (currentList === 'tvshows'):
        this.title = 'Search > TV Shows Results'
        this.lists = tvShows.lists
        this.totalPages = tvShows.totalPages
        this.totalResults = tvShows.totalResults
        this.currentPage = tvShows.currentPage
        break

      case (currentList === 'movies'):
        this.title = 'Search > Movie Results'
        this.lists = movies.lists
        this.totalPages = movies.totalPages
        this.totalResults = movies.totalResults
        this.currentPage = movies.currentPage
        break

      case (currentList === 'people'):
        this.title = 'Search > People Results'
        this.lists = people.lists
        this.totalPages = people.totalPages
        this.totalResults = people.totalResults
        this.currentPage = people.currentPage
        break

      default:
        console.log('Empty data')
    }

    // console.log(`page: ${this.currentPage}`)

    if (load) return (
      // <div className="loader-wrapper">
        <Loader />
      // </div>
    )

    return (
      <div className="search-result-container" style={{ marginTop: 177 }}>
        <div className="search-result-sidebar">
          <div><button onClick={(e) => this.handleSidebarMenuClick('tvshows', e)}>{`Tv Shows: ${tvShows.totalResults}`}</button></div>
          <div><button onClick={(e) => this.handleSidebarMenuClick('movies', e)}>{`Movies: ${movies.totalResults}`}</button></div>
          <div><button onClick={(e) => this.handleSidebarMenuClick('people', e)}>{`People: ${people.totalResults}`}</button></div>
        </div>
        <div className="search-result-content-container">
          <p>{this.title}</p>
          {
            (currentList === 'tvshows' || currentList === 'movies') && 
            <Fragment>
              <SearchResultList lists={this.lists} parentComponent={currentList} />
              <Pagination currentPage={this.currentPage} totalPages={this.totalPages} totalRecords={this.totalResults} pageLimit={20} pageNeighbours={2} onPageChanged={this.onPageChanged} />
            </Fragment>
          }
        </div>
      </div>
    )
  }
}

export default SearchResult