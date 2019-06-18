import React from 'react';
import BookCard from '../components/BookCard.js';

class BookListContainer extends React.Component {
  render(){
    return (
      <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
        {
          this.props.cardView === 'search' ?
            this.props.loaded ? this.props.bookList.map(book => <BookCard key={book.id} book={book} cardView={this.props.cardView} currentUser={this.props.currentUser}/>) : null
          :
          this.props.favorites.map(book => <BookCard key={book.id} book={book} cardView={this.props.cardView} currentUser={this.props.currentUser} removeFavorite={this.props.removeFavorite}/>)
        }
      </div>
    )
  }
}

export default BookListContainer
