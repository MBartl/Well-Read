import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import MainBox from './containers/MainBox.js';
import NavBar from './components/NavBar.js';
import LoginForm from './components/LoginForm.js';
import SignupForm from './components/SignupForm.js';

class App extends Component {
  state = {
    favorites: [],
		currentUser: null,
    cardView: 'search'
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
						currentUser: response
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
      cardView: 'search'
    })
  }

  setFavorites = () => {
    if (this.state.currentUser) {
      let favorites = [{}]
      this.state.currentUser.favorites.forEach(favorite => {
        favorites = [...favorites, {volumeInfo: favorite.book, favoriteId: favorite.id}]
      })
      favorites.shift()
      this.setState({
        favorites: favorites
      })
    }
  }

  removeFavorite = (favId) => {
    fetch(`http://localhost:3000/api/v1/favorites/${favId}`, {method: "DELETE"})
    .then(() => this.setState({
        favorites: this.state.favorites.filter(fav => fav.favoriteId !== favId)
      })
    )
  }

  render(){
    return (
      <div className="App">
        <NavBar setFavorites={this.setFavorites} favorites={this.cardFavorites} search={this.cardSearch} currentUser={this.state.currentUser} logOut={this.logOut} />
        <Switch>
          <Route path="/login" render={(routerProps) => {
            return <LoginForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
          }} />
          <Route path="/signup" render={(routerProps) => {
            return <SignupForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
          }} />
          <Route path="/search" render={(routerProps) => {
            return <MainBox favorites={this.state.favorites} cardView={this.state.cardView} currentUser={this.state.currentUser} {...routerProps}/>
          }} />
          <Route path="/favorites" render={(routerProps) => {
            return <MainBox favorites={this.state.favorites} setFavorites={this.setFavorites} removeFavorite={this.removeFavorite} cardView={this.state.cardView} currentUser={this.state.currentUser} {...routerProps}/>
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
