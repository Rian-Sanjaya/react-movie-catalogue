import React from 'react'
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
  nav = React.createRef()
  logo = React.createRef()
  
  state = {
    shrink: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = (e) => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      this.nav.current.style.padding = "15px 20px"
      this.setState({ shrink: true })
    } else {
      this.nav.current.style.padding = "20px 20px"
      this.setState({ shrink: false })
    }
  }

  render() {
    const { shrink } = this.state

    return (
      <div ref={this.nav} className="nav-container">
        <div className={shrink ? "nav-logo shrink" : "nav-logo"}>
          Movie<br/>
          Catalogue
        </div>
        <div className={shrink ? "nav-menu shrink" : "nav-menu"}>
          <ul>
            <li>
              <Link to="/">Movies</Link>
              <div className="movies-submenu">
                <Link to="/">Popular</Link>
                <Link to="/">Top Rated</Link>
                <Link to="/">Upcoming</Link>
                <Link to="/">Now Playing</Link>
              </div>
            </li>
            <li>
              <Link to="/">Tv Shows</Link>
              <div className="movies-submenu">
                <Link to="/">Popular</Link>
                <Link to="/">Top Rated</Link>
                <Link to="/">On TV</Link>
                <Link to="/">Airing Today</Link>
              </div>
            </li>
            <li><Link to="/">People</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Navigation