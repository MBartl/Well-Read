import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Redirect } from 'react-router-dom';


class BookPage extends Component {

  handleChange = () => {

  }

  render() {
    if (this.props.review === null) {
      return <Redirect to="/" />
    } else {
    const {thumbnail_url, title, authors, pageCount, publishedDate, description} = this.props.review

    return (
      <React.Fragment>
        <br />
        <span style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center"}}>
          <div><img src={thumbnail_url} alt={title} style={{width: "10em"}}/></div>
          <div style={{marginLeft: "2em"}}>
            <h2>{title}</h2>

            {authors ? <h4>{authors}</h4> : null }
            {publishedDate ? <p>Publish Date: {publishedDate}</p> : null }
            {pageCount ? <p>Page Count: {pageCount}</p> : null }
          </div>
        </span>

        <br />
        <div style={{width: "450px", maxWidth: "60%", margin: "auto"}}>
          {description ?
            <p style={{display: "inline-block", textAlign: "left", borderColor: "black",
              borderStyle: "solid", margin: "8px", padding: "8px", borderWidth: "thin"
            }}>{description}</p>
          :
          null }
        </div>

        <FormControl style={{width: "400px"}}>
          <TextField id="outlined-multiline-flexible" label="Review" multiline
            onChange={this.handleChange()} rows="5"
            helperText="Click the button or press enter to submit" variant="outlined"
          />
          <br />
          <Button variant="contained" color="primary"
            style={{width: "6em", float: "right"}}>Submit</Button>
        </FormControl>
      </React.Fragment>
    );
  }
}


}

export default BookPage;
