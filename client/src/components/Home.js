import React from 'react';

import Quakes from './Quakes';

import styles from './Home.css';

const Home = () => {
  return (
    <div className={styles.content}>
      <h1 className={styles.content__header}>Quakes</h1>
      <Quakes />
    </div>
  );
};

export default Home;
