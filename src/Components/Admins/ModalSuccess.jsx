import styles from './admins.module.css';

const ModalSuc = ({ setSucModalIsOpen, SucModalIsOpen }) => {
  if (SucModalIsOpen) {
    return (
      <>
        <div className={styles.darkBG} onClick={() => setSucModalIsOpen(false)} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>Success</h5>
            </div>
            <div className={styles.modalContent}>Operation carried out successfully</div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button className={styles.deleteBtn} onClick={() => setSucModalIsOpen(false)}>
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

export default ModalSuc;
