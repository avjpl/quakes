import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { routes } from './routes/syncRoutes';
import { typeDefs, resolvers } from './schema';

import styles from './App.css';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token'),
    }
  };
});

const link = ApolloLink.from([
  errorLink,
  authLink,
  httpLink
]);

const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a target='_blank' href='https://reactjs.org/docs/getting-started.html'>React docs</a>
            </li>
          </ul>
        </nav>

        {renderRoutes(routes)}
      </div>
    </Router>

  </ApolloProvider>
);

export default App;
