const db = require('./db');

module.exports = {
  paginateResults: ({
    after: cursor,
    pageSize = 20,
    results,
    // can pass in a function to calculate an item's cursor
    getCursor = () => null,
  }) => {
    if (pageSize < 1) return [];

    if (!cursor) return results.slice(0, pageSize);

    const cursorIndex = results.findIndex(item => {
      // if an item has a `cursor` on it, use that, otherwise try to generate one
      let itemCursor = item.cursor
        ? item.cursor
        : getCursor(item);

      // if there's still not a cursor, return false by default
      return itemCursor
        ? cursor === itemCursor
        : false;
    });

    /* Check if cursorIndex is -1 from findIndex above */
    return cursorIndex >= 0
      ? cursorIndex === results.length - 1 // don't let us overflow
        ? []
        : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize), // if less than pageSize return remaining results
        )
      : results.slice(0, pageSize); // If cursorIndex is -1 return then first 20
  },
  createStore: () => {
    const users = db.map(user => user);

    return { users };
  },
};
