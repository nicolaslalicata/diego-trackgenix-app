import React from 'react';
import styles from './modal.module.css';
import Button from '../Buttons/buttons';

const Modal = ({ children, isOpen, setIsOpen, message }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.contenedorModal}>
        <h3>{message}</h3>
        {children}
        <Button
          className={styles.buttonCloseModal}
          callback={() => setIsOpen(false)}
          text={'Close'}
        ></Button>
      </div>
    </div>
  );
};

export default Modal;
