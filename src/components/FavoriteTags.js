import React from 'react';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';


const FavoriteTags = (props) => {

  function getTagColor() {
    let hue = Math.floor(Math.random() * 360);
    let pastel = 'hsl(' + hue + ', 100%, 80%)';
    return pastel;
  }

  return (
    props.favTags.split(", ").map((tag, index) => {
      return(
        index === 0 || index % 3 ?
          <ButtonGroup key={index} variant="contained"
          aria-label="Full-width contained primary button group">
            <Button key={index}
              style={{backgroundColor: getTagColor()}}>
              {tag}
            </Button>
          </ButtonGroup>
        :
        <Button key={index}
          style={{backgroundColor: getTagColor()}}>
          {tag}
        </Button>
      )
    })
  );
}

export default FavoriteTags;
