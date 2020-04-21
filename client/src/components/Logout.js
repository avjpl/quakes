import React from 'react';
import { useApolloClient } from "@apollo/react-hooks";

import styles from './Logout.css';

const Logout = () => {
  const client = useApolloClient();

  const logOutHandler = (evt) => {
    evt.preventDefault();

    client.writeData({ data: { isLoggedIn: false } });
    localStorage.clear();
    client.clearStore();
  }

  return (
    <button className={styles.logout} onClick={logOutHandler}>
      Sign Out
    </button>
  );
};

export default Logout;
