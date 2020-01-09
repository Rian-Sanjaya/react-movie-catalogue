import React, { Component } from 'react'
import '../styles/movieDetail.css'

class MovieDetail extends Component {
  render() {
    return (
      <div className="md-wrapper">
        Movie Detail
        <div className="md-header-container">
          <div className="md-header">
            <div className="md-header-poster">
            </div>
            <div className="md-header-content">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieDetail