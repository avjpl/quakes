import React from 'react';

import styles from './QuakesItem.css';

const QuakesItem = ({ id, magnitude, location, when }) => (
  <div className={styles.quakes__item}>
    <h3><strong>Quake:</strong> {id}</h3>
    <ul>
      <li><strong>Location:</strong> {location}</li>
      <li><strong>magnitude:</strong> {magnitude}</li>
      <li><strong>When:</strong> {when}</li>
    </ul>
  </div>
);

export default QuakesItem;
