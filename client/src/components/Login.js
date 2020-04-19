import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';

import LoginForm from './LoginForm';

import { LOGIN_USER } from '../queries';

const Login = () => {
  const client = useApolloClient();
  const [login, { loading, error }] = useMutation(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        localStorage.setItem('token', login);

        if (login) {
          client.writeData({ data: { isLoggedIn: true } });
        }
      }
    }
  );

  if (loading) return <p>Loading</p>;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
};

export default Login;
