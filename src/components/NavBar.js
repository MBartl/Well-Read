import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class NavBar extends React.Component {

  render(){
    return (
      <div>
        {
          this.props.currentUser
            ?
              <Grid container direction="row" justify="center" alignItems="center">
                <Link to="/favorites" style={{margin: 3, padding: 0}}>
                  <Button onClick={this.props.favorites} variant="contained">
                    {this.props.currentUser.username}
                  </Button>
                </Link>
                <Link to="/search" style={{margin: 3, padding: 0}}>
                  <Button onClick={this.props.search} variant="contained">
                    Search
                  </Button>
                </Link>
                <Link onClick={this.props.logOut} style={{margin: 3, padding: 0}}>
                  <Button variant="contained">
                    Log Out
                  </Button>
                </Link>
              </Grid>
            :
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
}

export default NavBar
