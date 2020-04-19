import React from 'react';
import { useApolloClient } from "@apollo/react-hooks";

import styles from './Logout.css';

const Logout = () => {
  const { writeData, resetStore, onResetStore } = useApolloClient();

  const logOutHandler = (evt) => {
    evt.preventDefault();

    writeData({ data: { isLoggedIn: false } });
    localStorage.clear();
    resetStore();
    onResetStore();
  }

  return (
    <button className={styles.logout} onClick={logOutHandler}>
      Sign Out
    </button>
  );
};

export default Logout;
