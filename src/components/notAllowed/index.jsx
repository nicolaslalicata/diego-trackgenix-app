import React from 'react';
import styles from './notAllowed.module.css';
function notAllowed() {
  return (
    <div className={styles.container}>
      <h1>You are not allowed. Please, login!</h1>
    </div>
  );
}

export default notAllowed;
