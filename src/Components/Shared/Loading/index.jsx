import React from 'react';
import styles from '../Loading/loading.module.css';
import logo from './Assets/loading.gif';

function Loader({ isLoading }) {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1>Loading...</h1>
        <img src={logo} alt="loading..." />
      </div>
    );
  } else {
    return null;
  }
}

export default Loader;
