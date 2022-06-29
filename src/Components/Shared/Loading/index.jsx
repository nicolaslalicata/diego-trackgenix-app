import React from 'react';
import styles from '../Loading/loading.module.css';
import logo from './Assets/loading-gif.gif';

function Loader({ isLoading }) {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <img src={logo} alt="loading..." />
      </div>
    );
  } else {
    return null;
  }
}

export default Loader;
