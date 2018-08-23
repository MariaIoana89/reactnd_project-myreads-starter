import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Route} from 'react-router-dom';
import Listbook from './Listbook';
import Searchbooks from './Searchbooks';

class BooksApp extends React.Component {
  state = {
	    books: []
  }
 
  componentDidMount(){
	  BooksAPI.getAll().then((books) => {
	  this.setState({books: books})
		})
  }
  
  /*move book to selected shelf*/
 moveBooks = (book, shelf) => {
    if (this.state.books) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }
  
	render() {
	  return (
		<div className="app">
		<Route exact path="/" render={() => (		
			<Listbook
					books = {this.state.books}
					moveBooks ={this.moveBooks}
			/>
		)}
		/>
		{ /*show all books*/ }
		<Route exact path="/search" render={() => (		
			<Searchbooks 
				books = {this.state.books}
				moveBooks={this.moveBooks}
			/>
		)}
		/>
		</div>
	)
	}
}
export default BooksApp