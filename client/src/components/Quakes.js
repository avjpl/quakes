import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_ALL_QUAKES } from '../queries';

const QuakesItem = ({ id, magnitude, location, when }) => {
  return (
    <>
      <h3>Quake: {id}</h3>
      <ul>
        <li>Location: {location}</li>
        <li>magnitude: {magnitude}</li>
        <li>When: {when}</li>
      </ul>
    </>
  )
};

const Button = ({ quakes: { cursor, hasMore }, fetchMore }) => {
  return (
    <>
      {
        hasMore &&
        <button onClick={() =>
          fetchMore({
            variables: { after: cursor },
            updateQuery: (prev, { fetchMoreResult, ...rest }) => {
              console.log({ rest });
              if (!fetchMoreResult) return prev;

              return {
                ...fetchMoreResult,
                // overwrite quakes with the following
                quakes: {
                  ...fetchMoreResult.quakes, //
                  quakes: [ // update to array result with previous and more results
                    ...prev.quakes.quakes,
                    ...fetchMoreResult.quakes.quakes
                  ],
                },
              };
            },
          })}
        >Load More</button>
      }
    </>
  )
};

const Quakes = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_QUAKES);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>Not found</p>;

  return (
    <>
      {
        data.quakes &&
          data.quakes.quakes &&
          data.quakes.quakes.map(quake => (
            <QuakesItem key={quake.id} {...quake} />
          ))
      }
      <Button {...{ ...data, fetchMore }} />
    </>
  )
};

export default Quakes;
