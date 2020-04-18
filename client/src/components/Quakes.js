import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import QuakesItem from './QuakesItem';
import LoadMore from './LoadMore';

import { GET_ALL_QUAKES } from '../queries';

import styles from './Quakes.css';

const Quakes = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_QUAKES);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div className={styles.quakes}>
      {
        data.quakes &&
          data.quakes.quakes &&
          data.quakes.quakes.map(quake => (
            <QuakesItem key={quake.id} {...quake} />
          ))
      }
      <LoadMore {...{ ...data, fetchMore }} />
    </div>
  )
};

export default Quakes;
