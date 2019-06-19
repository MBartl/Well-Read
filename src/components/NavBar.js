import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';


const NavBar = (props) => {

  return (
    <div>
      { props.currentUser ?
        <Grid container direction="row" justify="center" alignItems="center">
          <Link to="/favorites" style={{margin: 3, padding: 0}}>
            <Button onClick={props.favorites} variant="contained">
              {props.currentUser.username}
            </Button>
          </Link>
          <Link to="/search" style={{margin: 3, padding: 0}}>
            <Button onClick={props.search} variant="contained">
              Search
            </Button>
          </Link>
          <Link to="/" onClick={props.logOut} style={{margin: 3, padding: 0}}>
            <Button variant="contained">
              Log Out
            </Button>
          </Link>
        </Grid> :

        <Grid container direction="row" justify="center" alignItems="center">
          <Link to="/login" style={{margin: 3, padding: 0}}>
            <Button variant="contained">
              Login
            </Button>
          </Link>
          <Link to="/signup" style={{margin: 3, padding: 0}}>
            <Button variant="contained">
              Sign Up
            </Button>
          </Link>
        </Grid>
      }
    </div>
  )
}

export default NavBar
