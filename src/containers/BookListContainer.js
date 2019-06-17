import React from 'react';
import BookCard from '../components/BookCard.js';

class BookListContainer extends React.Component {
    render(){
      return (
        <div style={{display: "flex",justifyContent: "center",flexDirection: "column",alignItems: "center"}}>
          {this.props.loaded ? this.props.bookList.map(book => <BookCard key={book.id} book={book}/>) : null}
        </div>
      )
    }
}

export default BookListContainer
