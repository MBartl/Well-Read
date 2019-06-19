import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class SignupForm extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleSubmit = (event) => {
    event.preventDefault()

		fetch("http://localhost:3000/api/v1/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then(response => {
			if (response.errors) {
				alert(response.errors)
			} else {
				// response is the user object
				// console.log(response)
				localStorage.setItem("token", response.token)
				this.props.setCurrentUser(response.user)
				this.props.history.push("/search")
			}
		})
	}

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{display: "flex",justifyContent: "center",flexDirection: "column",alignItems: "center"}}>
          <TextField
            label="Username"
            onChange={this.handleChange}
            value={this.state.username}
            margin="normal"
            variant="filled"
            name="username"
          />
          <TextField
            label="Password"
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            margin="normal"
            variant="filled"
            name="password"
          />
          <button style={{border: "none", padding: 0}}>
            <Button variant="contained">
              Create
            </Button>
          </button>
        </form>
      </div>
    )
  }
}

export default SignupForm
