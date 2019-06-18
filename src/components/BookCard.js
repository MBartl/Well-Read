import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

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
    .then(res => res.json())
    .then(doc => console.log(doc))
  }

  render(){
    const {imageLinks, title, authors, pageCount, publishedDate} = this.props.book.volumeInfo
    return (
      <Card style={{width: 345, margin: 3}}>

        {this.props.cardView === 'search' ?
          <React.Fragment>
            <h2>{title}</h2>
            {authors ? <h4>{authors.map( author => `"${author}"\n`)}</h4> : null}
            <img src={imageLinks.thumbnail} alt={title}/>
            {publishedDate ? <p>Publish Date: {publishedDate}</p> : null }
            {pageCount? <p>Page Count: {pageCount}</p> : null }
            <div>
              <Button variant="contained"
                onClick={() => this.favoriteBook(this.props.book)}>Favorite
              </Button>
            </div>
          </React.Fragment> :

          <React.Fragment>
            <h2>{title}</h2>
            {authors ? <h4>{authors}</h4> : null}
            <img src={this.props.book.volumeInfo.thumbnail_url} alt={title} />
            {publishedDate ? <p>Publish Date: {publishedDate}</p> : null }
            {pageCount? <p>Page Count: {pageCount}</p> : null }
            <div>
              <Button variant="contained" color="secondary"
                onClick={() => this.props.removeFavorite(this.props.book.favoriteId)}>Remove
              </Button>
            </div>
          </React.Fragment>
        }
      </Card>
    )
  }
}

export default BookCard
