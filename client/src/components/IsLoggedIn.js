import React from 'react';

import { IS_LOGGED_IN } from '../queries';

import { useIsLoggedIn } from '../hooks';

import Home from './Home';
import Login from './Login';

const IsLoggedIn = () => {
  const [isLoggedIn] = useIsLoggedIn(IS_LOGGED_IN);

  return isLoggedIn ? <Home /> : <Login />;
}

export default IsLoggedIn;
