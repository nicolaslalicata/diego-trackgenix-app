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
        <Button
          buttonStyle={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            width: '30px'
          }}
          callback={() => setIsOpen(false)}
          text={'X'}
        ></Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
