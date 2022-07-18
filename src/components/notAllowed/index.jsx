import React from 'react';
import styles from './notAllowed.module.css';

function NotAllowed() {
  return (
    <div className={styles.container}>
      <h1>You are not authorized. Please login.</h1>
    </div>
  );
}

export default NotAllowed;
