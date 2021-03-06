import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route , Link} from 'react-router-dom';
import './App.css'
import Book from './Book'

class BooksApp extends React.Component {
  state = {
    query:"",
    resultOfSearch:[],
    allBooks:[],
    showSearchPage: false,
    error:''
  }
  searchBook = (book) => {
    this.setState({
      query: book
    })
    
 BooksAPI.search(book).then(data =>{ 
   if(data.error){
    this.setState({
      error:data.error
    })//.catch(() =>{
      //console.log("No result found")
    //})
   }else{
    this.setState({
      error:"",
      resultOfSearch: data
    })}
   })
   
  }

  componentDidMount (){
    BooksAPI.getAll().then(data => {
      this.setState({
 allBooks:data
      })
     
    })
  }

  updateBooks = (book, shelf) => {BooksAPI.update(book, shelf).then(()=> 
    {
      BooksAPI.getAll().then(data => {
        this.setState({
          allBooks:data
        })
         })
    })
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
                 onChange ={(event) => this.searchBook(event.target.value)}
      
                 value ={this.state.query}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {this.state.resultOfSearch && this.state.resultOfSearch.map((resultOfSearch,index) => {
               return <Book updateBooks={this.updateBooks}  data = {resultOfSearch} key={index}>
               ></Book>
              })}
              </ol>
              
            </div>
          </div>
        ) : (
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
                    {this.state.allBooks && this.state.allBooks.filter((element) => {
                      return element.shelf === 'currentlyReading'
                    }).map((book,index) => {
               return <Book updateBooks={this.updateBooks} data = {book} key={index}>
               ></Book>})}
                      
                      
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.allBooks && this.state.allBooks.filter((element) => {
                      return element.shelf === 'wantToRead'
                    }).map((book,index) => {
               return <Book updateBooks={this.updateBooks} data = {book} key={index}>
               ></Book>})}
                      
                    
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.allBooks && this.state.allBooks.filter((element) => {
                      return element.shelf === 'read'
                    }).map((book,index) => {
               return <Book updateBooks={this.updateBooks}  data = {book} key={index}>
               ></Book>})}
                      
                     
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
            
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
