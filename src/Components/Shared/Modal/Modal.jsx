import React from 'react';
import styles from './modal.module.css';
import Button from '../Buttons/buttons';

const Modal = ({ children, isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.contenedorModal}>
            <Button
              className={styles.botonModal}
              callback={() => setIsOpen(false)}
              text={'Close'}
            ></Button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
