import React from 'react';
import styles from './index.module.css';

const Modal = ({ setModalMsg }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerItem}>
        <button>X</button>
        <h2>The employee was {setModalMsg}</h2>
      </div>
    </div>
  );
};

export default Modal;
