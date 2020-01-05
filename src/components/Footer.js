import React from 'react'
import '../styles/footer.css'

export default () => {
  return (
    <div className="footer">
      <p className="footer-title">Movie<br/>Catalogue</p>
      <p className="footer-desc">API from&nbsp;&nbsp;&nbsp;
        <a className="slider-link" href="https://www.themoviedb.org/" target="_blank" 
          rel="noopener noreferrer"
        >
          <img src="/images/themoviedb.svg" alt="the movie db logo" 
          width={50} style={{ verticalAlign: 'middle' }} />
        </a>
      </p>
    </div>
  )
}