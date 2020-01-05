import React from 'react'
import '../styles/searchBar.css'

export default () => {
  return (
    <div id="form-box">
      <form>
        <div id="input-group">
          <label htmlFor="email" className="glyphicon glyphicon-search"></label>
          <input type="text" placeholder="Search Class" id="email" />
        </div>
      </form>
    </div>
  )
}