import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import './styles/app.css'
import './styles/navigation.css'

class App extends React.Component {
  render() {
    return (
      <div className="main-wrapper">
        <Router>
          <Navigation />
          <Switch>
            <Home />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
