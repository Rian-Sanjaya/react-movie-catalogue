import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

class Navigation extends React.Component {
  nav = React.createRef()
  logo = React.createRef()

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount() {
    window.addEventListener('scroll', this.handleScroll)
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

  render() {
    const { navShrink } = this.props

    return (
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
    )
  }
}

export default Navigation