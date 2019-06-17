import React from 'react';
import Card from '@material-ui/core/Card';

class BookCard extends React.Component {

    render(){
      const {imageLinks, title, authors, pageCount, publishedDate} = this.props.book.volumeInfo

      return (
        <Card style={{width: 345, margin: 3}}>
          <img src={imageLinks.thumbnail} alt={title}/>
          <h2>{title}</h2>
          {authors ? <h4>{authors.map( author => `"${author}"\n` )}</h4> : null}
          {publishedDate ? <p>Publish Date: {publishedDate}</p> : null }
          {pageCount? <p>Page Count: {pageCount}</p> : null }
        </Card>
      )
    }
}

export default BookCard
