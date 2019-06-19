import React from 'react';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import FavoriteButtons from './FavoriteButtons';


class BookCard extends React.Component {

  favoriteBook = (book) => {
    const {title, authors, publisher, publishedDate, description, pageCount, averageRating, ratingsCount, maturityRating} = book.volumeInfo

    const thumbnail_url = book.volumeInfo.imageLinks.thumbnail

    fetch("http://localhost:3000/api/v1/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({title, authors, publisher, publishedDate, description, pageCount, averageRating, ratingsCount, maturityRating, thumbnail_url})
    })
    .then(res => res.json())
    .then(book => this.createFavorite(book))
  }

  createFavorite = (book) => {
    fetch("http://localhost:3000/api/v1/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({book_id: book.id, user_id: this.props.currentUser.id})
    })
    .then(alert("This book has been added to your favorites!"))
  }

  addTagToDB = (event, favoriteId) => {
    const input = event.target.value
    fetch(`http://localhost:3000/api/v1/favorites/${favoriteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({tags: input})
    })
    .then(event.target.value = '')
  }


  render() {
    const {imageLinks, title, authors, pageCount, publishedDate} = this.props.book.volumeInfo
    return (
      <Card style={{width: 345, margin: 3}}>


        <h2>{title}</h2>


        { this.props.cardView === 'search' ?
          <React.Fragment>
            {authors ? <h4>{authors.join(", ")}</h4> : null}
            <img src={imageLinks.thumbnail} alt={title}/>
          </React.Fragment> :

          <React.Fragment>
            {authors ? <h4>{authors}</h4> : null}
            <img src={this.props.book.volumeInfo.thumbnail_url} alt={title} />
          </React.Fragment>
        }


        {publishedDate ? <p>Publish Date: {publishedDate}</p> : null }
        {pageCount ? <p>Page Count: {pageCount}</p> : null }


        { this.props.cardView === 'search' ?

          <div>
            <Button variant="contained"
              onClick={() => this.favoriteBook(this.props.book)}>Favorite
            </Button>
          </div> :

          this.props.loaded ?

            <FavoriteButtons addTagToDB={this.addTagToDB}
              removeFavorite={this.props.removeFavorite}
              favorite={this.props.book.favorite}
              review={this.props.review} /> :
          null
        }

      </Card>
    )
  }
}

export default BookCard
