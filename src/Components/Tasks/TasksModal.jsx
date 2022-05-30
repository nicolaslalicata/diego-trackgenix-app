import React from 'react';
import styles from './modal.module.css';

const Modal = ({ children, modalState, setModalState }) => {
  return (
    <>
      {modalState && (
        <div className={styles.overlay}>
          <div className={styles.contenedorModal}>
            <button className={styles.botonModal} onClick={() => setModalState(false)}>
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
