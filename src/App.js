import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
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
            <Home navShrink={navShrink} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
