import styles from './admins.module.css';

const ModalDelete = ({ setIsOpen, isOpen, deleteAdmin }) => {
  if (isOpen) {
    return (
      <>
        <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>Dialog</h5>
            </div>
            <div className={styles.modalContent}>Are you sure you want to delete the item?</div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button className={styles.deleteBtn} onClick={() => deleteAdmin()}>
                  Delete
                </button>
                <button className={styles.cancelBtn} onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else return false;
};

export default ModalDelete;
