import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import MainBox from './containers/MainBox.js';
import BookPage from './containers/BookPage.js';

import NavBar from './components/NavBar.js';
import LoginForm from './components/LoginForm.js';
import SignupForm from './components/SignupForm.js';


class App extends Component {
  state = {
    favorites: [],
		currentUser: null,
    cardView: '',
    randomSearch: '',
    toggleRandom: false,
    loaded: false,
    review: null
	}

	componentDidMount(){
		const token = localStorage.getItem("token")
		if(token){
			// let's go get some user data
			fetch("http://localhost:3000/api/v1/auto_login", {
				headers: {
					"Authorization": token
				}
			})
			.then(res => res.json())
			.then(response => {
				if (response.errors){
					localStorage.removeItem("user_id")
					alert(response.errors)
				} else {
					this.setState({
						currentUser: response,
            loaded: true
					})
				}
			})
		}
	}

  refreshUser = () => {
    fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}`)
    .then(res => res.json())
    .then(user => this.setState({
      currentUser: user
    }))
    .then(() => {
      this.setState({
        loaded: false
      })
    })
    .then(() => {
      this.setFavorites()
    })
  }

  setCurrentUser = (user) => {
		this.setState({
			currentUser: user
		})
	}

	logOut = () => {
		this.setState({
			currentUser: null
		})
    localStorage.removeItem("token")

    this.props.history.push("/")
	}

  cardFavorites = () => {
    this.refreshUser()
    this.setState({
      cardView: 'favorites'
    })
  }

  cardSearch = () => {
    this.setState({
      randomSearch: false,
      cardView: 'search'
    })
  }

  setFavorites = () => {
    if (this.state.currentUser) {
      let favorites = [{}]
      this.state.currentUser.favorites.forEach(favorite => {
        favorites = [...favorites, {volumeInfo: favorite.book, favorite: favorite}]
      })
      favorites.shift()
      this.setState({
        favorites: favorites,
        loaded: true
      })
    }
  }

  review = (book) => {
    this.setState({
      review: book
    })
    this.props.history.push("/review")
  }

  removeFavorite = (favId) => {
    fetch(`http://localhost:3000/api/v1/favorites/${favId}`, {method: "DELETE"})
    .then(() => this.setState({
        favorites: this.state.favorites.filter(fav => fav.favorite.id !== favId)
      })
    )
  }

  setRandom = () => {
    const booksArray = ["Lord of the Rings", "Le Petit Prince", "Harry Potter", "The Hobbit", "And Then There Were None", "The Lion, the Witch and the Wardrobe", "The Da Vinci Code", "The Catcher in the Rye", "The Bridges of Madison County", "Charlotte's Web", "Lolita", "The Very Hungry Caterpillar", "The Tale of Peter Rabbit", "To Kill a Mockingbird", "Flowers in the Attic", "Angels & Demons", "The Kite Runner", "Gone with the Wind", "Nineteen Eighty-Four", "The Great Gatsby", "The Hunger Games", "The Fault in Our Stars", "The Girl on the Train", "The Godfather", "What to Expect When You're Expecting", "Dune", "Goodnight Moon", "The Grapes of Wrath", "The Hitchhiker's Guide to the Galaxy"]

    const title = booksArray[Math.floor(Math.random() * booksArray.length)]

    if (this.state.toggleRandom === false) {
      this.cardSearch()
      this.props.history.push("/search")
      this.setState({
        randomSearch: title,
        toggleRandom: true
      })
    }
  }

  setRandomFalse = () => {
    this.setState({
      toggleRandom: false
    })
  }

  render(){
    return (
      <div className="App">
        <span style={{display: "flex", justifyContent: "center", paddingRight: "5.8em"}}>
          <img onClick={() => this.setRandom()}
            src="http://res.publicdomainfiles.com/pdf_view/132/13970482814262.png"
            alt="well"
            style={{backgroundColor: this.state.toggleRandom ? '#303156' : null,
            borderRadius: "35px", height: "78px", width: "auto", cursor: "pointer"}} />
          <img src="https://fontmeme.com/permalink/190619/71c3f590e3aed5a51bef5d833b5b07fb.png" alt="Well Read" />
        </span>
        <NavBar setFavorites={this.setFavorites} favorites={this.cardFavorites} search={this.cardSearch} currentUser={this.state.currentUser} logOut={this.logOut} />
        <Switch>
          <Route path="/login" render={(routerProps) => {
            return <LoginForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
          }} />

          <Route path="/signup" render={(routerProps) => {
            return <SignupForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
          }} />

          <Route path="/search" render={(routerProps) => {
            return <MainBox favorites={this.state.favorites} cardView={this.state.cardView} currentUser={this.state.currentUser} toggleRandom={this.state.toggleRandom} setRandom={this.setRandom} randomSearch={this.state.randomSearch} setRandomFalse={this.setRandomFalse} {...routerProps}/>
          }} />

          <Route path="/favorites" render={(routerProps) => {
            return <MainBox loaded={this.state.loaded} favorites={this.state.favorites} setFavorites={this.setFavorites} removeFavorite={this.removeFavorite.bind(this)} cardView={this.state.cardView} currentUser={this.state.currentUser} review={this.review} {...routerProps}/>
          }} />

          <Route path="/review" render={(routerProps) => {
            return <BookPage review={this.state.review} {...routerProps}/>
          }} />

        </Switch>
      </div>
    );
  }
}

export default App;
