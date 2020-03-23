import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './components/Home'
import MoviePopular from './components/MoviePopular'
import TvShowsPopular from './components/TvShowsPopular'
import SearchResult from './components/SearchResult'
import MovieDetail from './components/MovieDetail'
import './styles/app.css'
import './styles/navigation.css'

class App extends React.Component {
  state = {
    navShrink: false,
    videoDisp: false,
    youtubeKey: '',
  }

  handleNavShrink(val) {
    this.setState({
      navShrink: val
    })
  }

  showVideo = (val) => {
    this.setState({
      videoDisp: true,
      youtubeKey: val,
    })
  }

  hideVideo = () => {
    this.setState({
      videoDisp: false,
      youtubeKey: '',
    })
  }

  render() {
    const { navShrink, videoDisp, youtubeKey } = this.state

    return (
      <div className="main-wrapper">
        <div id="top-div"></div>

        <div className="video-modal" style={{ display: videoDisp ? 'block' : 'none' }}>
          <div className="video-container">
            <div className="video-content">
              <div className="close-video" title="Close" onClick={this.hideVideo}>X</div>
              <iframe 
                className="video-frame"
                type="text/html"
                src={`https://www.youtube.com/embed/${youtubeKey}`}
                title="Star Wars"
                frameBorder="0"
              />
            </div>
          </div>
        </div>

        <Router>
          <Navigation navShrink={navShrink} onHandleNavShrink={(val) => this.handleNavShrink(val)} />
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} navShrink={navShrink} />} />
            <Route 
              path='/movie/popular' 
              render={(props) => (
                <MoviePopular {...props} 
                  baseUrl={`https://api.themoviedb.org/3/movie/popular?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US`} 
                />
              )} 
            />
            <Route 
              path='/tvshows/popular'
              render={(props) => (
                <TvShowsPopular {...props}
                  baseUrl={`https://api.themoviedb.org/3/tv/popular?api_key=e4621b68dcd1fa1de4a66cfd0664dc28&language=en-US`}
                />
              )}
            />
            <Route path="/search/result" component={SearchResult} />
            <Route 
              path="/movie/detail" 
              // component={MovieDetail} 
              render={ props => (
                <MovieDetail {...props} onShowVideo={this.showVideo} />
              )}
            />
          </Switch>
          <Footer />
        </Router>

      </div>
    );
  }
}

export default App;
