import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './components/Home'
import MoviePopular from './components/MoviePopular'
import './styles/app.css'
import './styles/navigation.css'

class App extends React.Component {
  state = {
    navShrink: false,
  }

  handleNavShrink(val) {
    this.setState({
      navShrink: val
    })
  }

  render() {
    const { navShrink } = this.state

    return (
      <div className="main-wrapper">
        <Router>
          <Navigation navShrink={navShrink} onHandleNavShrink={(val) => this.handleNavShrink(val)} />
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} navShrink={navShrink} />} />
            <Route path="/movie/popular" component={MoviePopular} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
