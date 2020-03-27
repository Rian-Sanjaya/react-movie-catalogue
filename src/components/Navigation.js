import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

class Navigation extends React.Component {
  nav = React.createRef()
  // logo = React.createRef()

  constructor(props) {
    super(props)

    this.state = {
      showHamburgerMenu: false,
      showMoviesSubMenu: false,
      showTvShowsSubMenu: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true)
  }

  handleScroll = (e) => {
    const { navShrink, onHandleNavShrink } = this.props

    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      if (navShrink === false) {
        this.nav.current.style.padding = "15px 20px"
        onHandleNavShrink(true)
      }

    } else {
      if (navShrink === true) {
        this.nav.current.style.padding = "20px 20px"
        onHandleNavShrink(false)
      }
    }
  }

  handleHamburgerClick = () => {
    if (this.state.showHamburgerMenu) {
      document.body.style = ""
      const topDiv = document.getElementById("top-div")
      topDiv.removeAttribute("style")

    } else {
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = "15px"

      const topDiv = document.getElementById("top-div")
      topDiv.setAttribute("style", "position: fixed; top: 0; left: 0; bottom: 0; right: 0; z-index: 1001")
    }

    this.setState({
      showHamburgerMenu: !this.state.showHamburgerMenu,
    })
  }

  handleHamburgerMenuClick = (menu) => {
    if (menu === 'movies')
      this.setState({
        showMoviesSubMenu: !this.state.showMoviesSubMenu
      })
    else if (menu === 'tvshows')
      this.setState({
        showTvShowsSubMenu: !this.state.showTvShowsSubMenu
      })
  }

  render() {
    const { showHamburgerMenu, showMoviesSubMenu, showTvShowsSubMenu } = this.state
    const { navShrink } = this.props

    return (
      <nav>
        <div className="mm-hamburger-menu"><span onClick={this.handleHamburgerClick}><i className="fa fa-bars"></i></span></div>
        <div className={showHamburgerMenu ? "mobile-menu show-menu" : "mobile-menu"}>
          <ul>
            <li>
              <button onClick={() => this.handleHamburgerMenuClick('movies')}>Movies</button>
              <div className={showMoviesSubMenu ? "mm-movies-submenu show-movies-sub" : 'mm-movies-submenu'}>
                <Link to="/movie/popular">Popular</Link>
                <Link to="/">Top Rated</Link>
                <Link to="/">Upcoming</Link>
                <Link to="/">Now Playing</Link>
              </div>
            </li>
            <li>
              <button onClick={() => this.handleHamburgerMenuClick('tvshows')}>Tv Shows</button>
              <div className={showTvShowsSubMenu ? "mm-movies-submenu show-tvshows-sub" : 'mm-movies-submenu'}>
                <Link to="/tvshows/popular">Popular</Link>
                <Link to="/">Top Rated</Link>
                <Link to="/">On TV</Link>
                <Link to="/">Airing Today</Link>
              </div>
            </li>
            <li><button>People</button></li>
          </ul>
        </div>

      <div className="nav-wrapper">
        <div ref={this.nav} className="nav-container">
          <div className={navShrink ? "nav-logo shrink" : "nav-logo"}>
            <Link to='/'>
              Movie<br/>
              Catalogue
            </Link>
          </div>
          <div className={navShrink ? "nav-menu shrink" : "nav-menu"}>
            <ul>
              <li>
                <Link to="/movie/popular">Movies</Link>
                <div className="movies-submenu">
                  <Link to="/movie/popular">Popular</Link>
                  <Link to="/">Top Rated</Link>
                  <Link to="/">Upcoming</Link>
                  <Link to="/">Now Playing</Link>
                </div>
              </li>
              <li>
                <Link to="/tvshows/popular">Tv Shows</Link>
                <div className="movies-submenu">
                  <Link to="/tvshows/popular">Popular</Link>
                  <Link to="/">Top Rated</Link>
                  <Link to="/">On TV</Link>
                  <Link to="/">Airing Today</Link>
                </div>
              </li>
              <li><Link to="/">People</Link></li>
            </ul>
          </div>
        </div>
        <SearchBar />
      </div>
      </nav>
    )
  }
}

export default Navigation