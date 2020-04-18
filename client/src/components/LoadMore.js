import React from 'react';

import styles from './LoadMore.css';

const LoadMore = ({ quakes: { cursor, hasMore }, fetchMore }) => (
  <>
    {
      hasMore &&
      <button className={styles.load__more} onClick={() =>
        fetchMore({
          variables: { after: cursor },
          updateQuery: (prev, { fetchMoreResult, ...rest }) => {
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
);

export default LoadMore;
