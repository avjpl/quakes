import React from 'react';

import Gallery from './Gallery';

import styles from './Home.css';

const Home = () => {
  return (
    <Gallery>
      <Gallery.Image />
      <Gallery.Video />
    </Gallery>
  );
};

export default Home;
