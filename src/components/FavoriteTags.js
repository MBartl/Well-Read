import React from 'react';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';


class FavoriteTags extends React.Component {

  getTagColor = () => {
    let hue = Math.floor(Math.random() * 360);
    let pastel = 'hsl(' + hue + ', 100%, 80%)';
    return pastel;
  }

  handleClick = (tag, favoriteId) => {
    let check = window.confirm("Delete this tag?")

    return check
  }

  render() {
    return (
      this.props.favTags.split(", ").map((tag, index) => {
        return(
          index === 0 || index % 3 === 0 ?
          <React.Fragment key={index}>
            <br />
            <ButtonGroup key={index} variant="contained"
            aria-label="Full-width contained primary button group">
              <Button key={index}
                style={{backgroundColor: this.getTagColor()}}
                onClick={(event) => {
                  let favoriteId = this.props.favorite.id
                  if (this.handleClick(event.target.innerText, favoriteId)) {
                    this.props.deleteTag(event.target.innerText, favoriteId)
                  }
                }}>
                {tag}
              </Button>
            </ButtonGroup>
          </React.Fragment>
          :
          <Button key={index}
            style={{backgroundColor: this.getTagColor()}}
            onClick={(event) => {
              let favoriteId = this.props.favorite.id
              if (this.handleClick(event.target.innerText, favoriteId)) {
                this.props.deleteTag(event.target.innerText, favoriteId)
              }
            }}>
            {tag}
          </Button>
        )
      })
    );
  }
}

export default FavoriteTags;
