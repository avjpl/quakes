import React, { useState, Children, cloneElement } from 'react';

import Image from './Image';
import Video from './Video';

const Gallery = ({ children }) => {
  const [type, setType] = useState('Image');

  return (
    <div>
      {
        Children.map(children, (child) => {
          const name = child.type.name;
          if (name === type) {
            return cloneElement(child);
          }
        })
      }

      {
        Children.map(children, (child) => {
          const name = child.type.name;
          return <button onClick={() => setType(name)}>{name}</button>
        })
      }
    </div>
  )
}

Gallery.Image = Image;
Gallery.Video = Video;

export default Gallery;
