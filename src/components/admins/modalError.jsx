import styles from './admins.module.css';

const ModalError = ({ setErrModalIsOpen, ErrModalIsOpen }) => {
  if (ErrModalIsOpen) {
    return (
      <>
        <div className={styles.darkBG} onClick={() => setErrModalIsOpen(false)} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>Error</h5>
            </div>
            <div className={styles.modalContent}>The operation had errors to be performed</div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button className={styles.deleteBtn} onClick={() => setErrModalIsOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else return false;
};

export default ModalError;
