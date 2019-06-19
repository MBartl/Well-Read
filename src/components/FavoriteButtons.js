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
    event.preventDefault()
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

  stopNilTag = (event) => {
    event.preventDefault()
    alert("Please enter a tag")
  }

  render() {
    let favTags;
    if (this.state.tags) {favTags = this.state.tags};
    return (
      <React.Fragment>

        {favTags ?
          <React.Fragment>
            <FavoriteTags favTags={favTags} favorite={this.props.favorite} />
            <div>
              <br />
            </div>
          </React.Fragment>
        :
          null
        }

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
          <TextField label="Tags" margin="normal"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.target.value === "" ?
                  this.stopNilTag(event)
                :
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
