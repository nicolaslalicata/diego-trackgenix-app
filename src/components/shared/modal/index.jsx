import React from 'react';
import styles from './modal.module.css';
import Button from 'components/shared/buttons';

const Modal = ({ children, isOpen, setIsOpen, title, reset }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.contenedorModal}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <Button
            className={styles.buttonCloseModal}
            callback={() => {
              setIsOpen(false);
              reset();
            }}
            icons={'close'}
          ></Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
