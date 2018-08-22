import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';

class Listbook extends Component {
  render() {
	  /*display all three shelves */ 
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

				  { /*show all the books from currentlyReading*/ }
				  {this.props.books
				  	.filter(book => book.shelf === 'currentlyReading')
					.map (book => (
						<li key={book.id}>
							<Book 
								book={book}
								moveBooks ={this.props.moveBooks}
								currentShelf = "currentlyReading"
							/>
						</li>					
						)
					)
				  }
			      </ol>
                </div>
              </div>
            </div>
          </div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

            { /*show all the books from wantToRead*/ }
				  {this.props.books
				  	.filter(book => book.shelf === 'wantToRead')
					.map (book => (
						<li key={book.id}>
							<Book 
								book={book}
								moveBooks ={this.props.moveBooks}
								currentShelf = "wantToRead"
							/>
						</li>					
						)
					)
				  }
			      </ol>
                </div>
              </div>
            </div>
          </div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
            { /*show all the books from shelf read*/ }
				  {this.props.books
				  	.filter(book => book.shelf === 'read')
					.map (book => (
						<li key= {book.id}>
							<Book 
								book= {book}
								moveBooks = {this.props.moveBooks}
								currentShelf= "read"
							/>
						</li>					
						)
					)
				  }
				  </ol>
                </div>
              </div>
            </div>
          </div>		  
		  {/* the search link*/ }
          <div className="open-search">
            <Link 
				to="/search"
				onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
  </div>
    </div>
	  </div>  
    </div>
        )
    }
}
export default Listbook