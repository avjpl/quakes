import gql from 'graphql-tag';

export const GET_ALL_QUAKES = gql`
  query GetQuakes($after: String) {
    quakes(after: $after) {
      cursor
      hasMore
      quakes {
        id
        magnitude
        location
        when
        cursor
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
