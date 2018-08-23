import React, {Component} from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'

class Searchbooks extends Component {
    state = {
        searchedBooks: [],
        query: ''
    }
    updateQuery = (query) => {
        this.setState({
            query: query
        })
        this.updateSearchedBooks(query);
    }
    
    /*display the books that match the search query*/ 
    updateSearchedBooks = (query) => {
    let showingBooks = []
        if (query){
      BooksAPI.search(query).then(response => {
        if (response.length) {
          showingBooks = response.map(b => {
            const index = this.state.books.findIndex(c => c.id === b.id)
            if( index >= 0 ) {
              return this.state.books[index]
            } else {
              return {...b, shelf: 'none'}
            }
          })
        }
        this.setState({searchedBooks: showingBooks})
      })
        } else{
            this.setState({searchedBooks: []});
        }
    }

  // get all the books before loading the component
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }
    
render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
        { /*go back to listbook*/ }
        <Link to="/"
            className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close
        </Link>
          <div className="search-books-input-wrapper">

          <input type = "text"
            placeholder = "Search by title or author"
            value = {this.state.query}
            /* change the value of the query as it is writen */
            onChange = {(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.state.searchedBooks.map(searchedBook => {
                return (
                    <li key={searchedBook.id}>
                    <Book
                        book = {searchedBook}
                        moveBooks={this.props.moveBooks}
                        currentShelf = {searchedBook.shelf}
                    />
                </li>
                );
            })
          } 
          </ol>
        </div>
      </div>
    )
  }
}

export default Searchbooks