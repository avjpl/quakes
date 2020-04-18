import React from 'react';

import Quakes from './Quakes';

const Home = () => {
  return (
    <>
      <h1>Quakes</h1>
      <Quakes />
    </>
  );
};

export default Home;

/*
  client
  .query({
    query: gql`
      query GetQuakes {
        quakes {
          cursor
          hasMore
          quakes {
            location
            magnitude
            cursor
          }
        }
      }
    `
  })
  .then(result => console.log(result));
*/
