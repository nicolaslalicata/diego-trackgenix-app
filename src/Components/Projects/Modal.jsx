import React from 'react';
import styles from './Modal.module.css';

const Modal = ({
  children,
  onClose,
  onCancel,
  onAction,
  actionLabel,
  modalTitle,
  showActions = false
}) => {
  return (
    <>
      <div className={styles.darkBG} onClick={onClose} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{modalTitle}</h5>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            X
          </button>
          {children && <div className={styles.modalContent}>{children}</div>}
          {showActions && (
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button className={styles.deleteBtn} onClick={onAction}>
                  {actionLabel}
                </button>
                <button className={styles.cancelBtn} onClick={onCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
