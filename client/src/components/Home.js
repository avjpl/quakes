import React from 'react';

import Quakes from './Quakes';
import Logout from './Logout';

import { useIsLoggedIn } from '../hooks';

import { IS_LOGGED_IN } from '../queries';

import styles from './Home.css';

const Home = () => {
  const [isLoggedIn, redirect] = useIsLoggedIn(IS_LOGGED_IN);

  if (!isLoggedIn) {
    redirect.login();
  }

  return (
    <div className={styles.content}>
      <h1 className={styles.content__header}>Quakes</h1>
      <Logout />
      <Quakes />
    </div>
  );
};

export default Home;
