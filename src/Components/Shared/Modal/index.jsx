import React from 'react';
import styles from './modal.module.css';
import Button from '../Buttons/buttons';
const Modal = ({ children, isOpen, setIsOpen, title }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.contenedorModal}>
        <h3>{title}</h3>
        <Button
          className={styles.buttonCloseModal}
          callback={() => setIsOpen(false)}
          text={'Close'}
        ></Button>
        {children}
      </div>
    </div>
  );
};
export default Modal;
