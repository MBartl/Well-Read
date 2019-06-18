import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import BookListContainer from './BookListContainer.js';
import { Redirect } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

class MainBox extends React.Component {
  state = {
    searchValue: "",
    bookList: [],
    loaded: false,
    currentPage: 1
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  checkEnter = (event) => {
    if (event.nativeEvent.key === "Enter") {
      this.handleFetch()
    }
  }

  handleFetch = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchValue}&orderBy=relevance&key=AIzaSyCvWbjTPUGhdu509kwqKShHyICeEB_JuDw&startIndex=${(this.state.currentPage-1)*10}&filter=partial&projection=full`)
    .then(res => res.json())
    .then(data => this.setState({
      bookList: data.items,
      loaded: true
    }))
    .then(() => console.log(this.state.bookList))
  }

  render(){
    if (this.props.currentUser === null) {
      // console.log("here")
      // this.props.history.push("/")
      return <Redirect to="/" />
    } else {
    return (
      <div>
        {this.props.cardView === 'search' ?
          <container style={{display: "flex",justifyContent: "center",flexDirection: "row",alignItems: "center"}}>
            <FormControl style={{width: 281}}>
              <InputLabel htmlFor="component-simple">Search</InputLabel>
              <Input id="component-simple" onKeyPress={this.checkEnter.bind(this)} onChange={this.handleChange} value={this.state.searchValue} name="searchValue"/>
            </FormControl>
            <Button style={{marginTop: "auto"}} onClick={this.handleFetch}>
              <SearchIcon />
            </Button>
          </container>
        :
          null
        }
        <BookListContainer cardView={this.props.cardView} favorites={this.props.favorites} bookList={this.state.bookList} loaded={this.state.loaded} removeFavorite={this.props.removeFavorite} currentUser={this.props.currentUser}/>
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
