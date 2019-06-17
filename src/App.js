import React, { Component } from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import MainBox from './containers/MainBox.js';
import NavBar from './components/NavBar.js';
import LoginForm from './components/LoginForm.js';
import SignupForm from './components/SignupForm.js';

class App extends Component {
  state = {
		currentUser: null
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

  render(){
    return (
      <div className="App">
        This are a App
        <NavBar currentUser={this.state.currentUser} logOut={this.logOut} />
          <Switch>
            <Route path="/login" render={(routerProps) => {
    					return <LoginForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
    				}} />
            <Route path="/signup" render={(routerProps) => {
							return <SignupForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
						}} />
            <Route path="/mainbox" render={(routerProps) => {
    					return <MainBox currentUser={this.state.currentUser} {...routerProps}/>
    				}} />
          </Switch>
      </div>
    );
  }
}

export default App;
