import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import BookListContainer from './BookListContainer';
import { Redirect } from 'react-router-dom';


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
    let searchValue = this.state.searchValue

    if (this.props.toggleRandom) {
      searchValue = this.props.randomSearch
    }

    const APIKEY = `${process.env.REACT_APP_API_KEY}`
    searchValue === "" ?
      alert("Please enter a search term") :

      fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&orderBy=relevance&key=${APIKEY}&startIndex=${(this.state.currentPage-1)*10}&filter=partial&projection=full`)
      .then(res => res.json())
      .then(data => this.setState({
        bookList: data.items,
        loaded: true
      }))
      .then(() => {
        if (this.props.toggleRandom) {
          this.props.setRandomFalse()
          this.setState({
            searchValue: this.props.randomSearch
          })
        }
      })
      .then(() => console.log(this.state.bookList))
  }

  handleRandomFetch = (event) => {
    if (this.props.toggleRandom === true) {
      this.handleFetch()
    }
  }

  render(){
    if (this.props.currentUser === null) {
      return <Redirect to="/" />
    } else {
      return (
      <div>
        {this.props.cardView === 'search' ?
          <React.Fragment>
            <FormControl style={{width: 300}}>
              <InputLabel htmlFor="component-simple">Search</InputLabel>
              {
                this.props.toggleRandom ?
                  <Input id="component-simple" onLoad={this.handleRandomFetch()} value={this.state.searchValue}
                  name="searchValue" /> :
                  <Input id="component-simple" onKeyPress={this.checkEnter.bind(this)} onChange={this.handleChange} value={this.state.searchValue} name="searchValue" />
              }
            </FormControl>
            <span>
              <Button style={{marginBottom: "2.2em"}} onClick={this.handleFetch}>
                <SearchIcon />
              </Button>
              <img src="https://books.google.com/googlebooks/images/poweredby.png"
                alt="Powered by Google" style={{paddingTop: "1.4em"}}/>
            </span>
          </React.Fragment>
        :
          null
        }
        <BookListContainer cardView={this.props.cardView} favorites={this.props.favorites} bookList={this.state.bookList} loaded={this.state.loaded} removeFavorite={this.props.removeFavorite} currentUser={this.props.currentUser} favsLoaded={this.props.loaded} review={this.props.review} />
      </div>
    )}
  }
}

export default MainBox
