import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import FavoriteTags from './FavoriteTags'


class FavoriteButtons extends React.Component {

  state = {
    tags: this.props.favorite.tags,
    hideEdit: true
  }

  toggleEdit = () => {
    this.setState({
      hideEdit: !this.state.hideEdit
    })
  }

  addToTags = (event) => {
    if (this.state.tags) {
      this.setState({
        tags: `${this.state.tags}, ${event.target.value}`
      })
    }
    else {
      this.setState({
        tags: event.target.value
      })
    }

    this.props.addTagToDB(event, this.props.favorite.id)
  }

  render() {
    let favTags;
    if (this.state.tags) {favTags = this.state.tags};
    return (
      <React.Fragment>

        {favTags ?
          <FavoriteTags favTags={favTags} />
        :
          null
        }

        <br />

        <div className="Primary Buttons">
          <Button variant="contained" color="secondary"
            onClick={() => this.props.removeFavorite(this.props.favorite.id)}>
            Remove
          </Button>
          <Button variant="contained" color="primary"
            onClick={() => this.toggleEdit()}>Edit Tags
          </Button>
        </div>

        <form className="Edit Tags" hidden={this.state.hideEdit}>
          <TextField label="Tags" multiline rowsMax="4" margin="normal"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                this.addToTags(event)
              }
            }}
          helperText="Press enter to submit"/>
        </form>

      </React.Fragment>
    );
  }

}

export default FavoriteButtons;
