import React from 'react';

import styles from './QuakesItem.css';

const QuakesItem = ({ id, magnitude, location, when }) => (
  <div className={styles.quakes__item}>
    <h3>Quake: {id}</h3>
    <ul>
      <li>Location: {location}</li>
      <li>magnitude: {magnitude}</li>
      <li>When: {when}</li>
    </ul>
  </div>
);

export default QuakesItem;
