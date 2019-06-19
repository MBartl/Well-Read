import React from 'react';
import BookCard from '../components/BookCard';


class BookListContainer extends React.Component {
  render() {
    return (
      <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
        {
          this.props.cardView === 'search' ?
            this.props.loaded ? this.props.bookList.map(book => <BookCard key={book.id} book={book} cardView={this.props.cardView} currentUser={this.props.currentUser}/>) : null
          :
          this.props.favorites.map(book => <BookCard key={book.volumeInfo.id} book={book} cardView={this.props.cardView} currentUser={this.props.currentUser} removeFavorite={this.props.removeFavorite} loaded={this.props.favsLoaded} review={this.props.review} />)
        }
      </div>
    )
  }
}

export default BookListContainer
