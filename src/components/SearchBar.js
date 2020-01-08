import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../styles/searchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchInput: '',
      toSearchResult: false,
    }
  }

  handleInputChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.history.push({
      pathname: '/search/result',
      state: { keywords: this.state.searchInput }
    })
    // this.setState({ toSearchResult: true })
  }

  render() {
    const { searchInput } = this.state

    // if (toSearchResult) return <Redirect to="/search/result" />

    return (
      <div id="search-container">
        <form onSubmit={this.handleSubmit}>
          <div id="input-group">
            <label htmlFor="search-input" className="glyphicon glyphicon-search"></label>
            <input type="text" 
              placeholder="Search for a movie, tv shows, person..." 
              id="search-input" 
              name='searchInput'
              value={searchInput}
              onChange={this.handleInputChange}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(SearchBar)
// export default SearchBar