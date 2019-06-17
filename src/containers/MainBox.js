import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import BookListContainer from './BookListContainer.js';
import { Redirect } from 'react-router-dom';

class MainBox extends React.Component {
  state = {
    searchValue: "",
    bookList: [],
    loaded: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state.searchValue)
  }

  handleFetch = () => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=japanese+cookbook&orderBy=relevance&key=AIzaSyCvWbjTPUGhdu509kwqKShHyICeEB_JuDw&maxResults=5&startIndex=0&filter=partial")
    .then(res => res.json())
    .then(data => this.setState({
      bookList: data.items,
      loaded: true
    }))
    .then(() => console.log(this.state))
  }

  componentDidMount(){
    return this.props.currentUser ? this.handleFetch() : null
  }

  render(){
    if (this.props.currentUser === null) {
      // console.log("here")
       // this.props.history.push("/")
       return <Redirect to="/" />

    } else {
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="component-simple">Search</InputLabel>
          <Input id="component-simple" onChange={this.handleChange} value={this.state.searchValue} name="searchValue"/>
        </FormControl>
        <BookListContainer bookList={this.state.bookList} loaded={this.state.loaded}/>
      </div>
    )
  }}
}



export default MainBox

// fetch("http://localhost:3000/api/v1/users", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Accepts": "application/json",
// 			},
// 			body: JSON.stringify({
//     user: {
//       username: 'guy',
//       password: 'hi'
//     }
//   })})
// 		.then(res => res.json())
// 		.then(console.log)

// fetch("http://localhost:3000/api/v1/login", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Accepts": "application/json",
// 			},
// 			body: JSON.stringify({
//     user: {
//       username: 'guy',
//       password: 'hi'
//     }
//   })})
// 		.then(res => res.json())
// 		.then(console.log)
