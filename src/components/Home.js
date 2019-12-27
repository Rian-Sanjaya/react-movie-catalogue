import React, { Component } from 'react'
import '../styles/home.css'

class Home extends Component {
  render() {
    return (
      <div className="hero-image">
        <div className="hero-content">
          <div className="hero-title">Movies Catalogue</div>
          <div className="hero-desc">Your Movies and TV Shows Info</div>
        </div>
      </div>
    )
  }
}

export default Home