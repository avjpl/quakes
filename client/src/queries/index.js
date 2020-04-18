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
