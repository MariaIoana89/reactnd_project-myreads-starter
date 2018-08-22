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
		if (query){
		BooksAPI.search(query).then((searchedBooks) => {
			/* search array empty if there is an error*/ 
			if(searchedBooks.error){
				this.setState({searchedBooks: []});
			} else
			this.setState({searchedBooks: searchedBooks});
        })
		} else{
			this.setState({searchedBooks: []});
		}
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
				let shelf = "none";
		 /*move filtered book onto chosen shelf in the listbook*/ 
				this.props.books.map(book => (
					book.id === searchedBook.id ?
					shelf = book.shelf :
					shelf = "none"
			));
				return (
					<li key={searchedBook.id}>
					<Book 
						book = {searchedBook}
						moveBooks={this.props.moveBooks}
						currentShelf = {shelf}
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