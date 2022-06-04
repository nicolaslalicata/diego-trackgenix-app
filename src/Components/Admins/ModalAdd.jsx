import styles from './admins.module.css';

const ModalAdd = ({ setAddModalIsOpen, AddModalIsOpen, addAdmin }) => {
  if (AddModalIsOpen) {
    return (
      <>
        <div className={styles.darkBG} onClick={() => setAddModalIsOpen(false)} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>Dialog</h5>
            </div>
            <div className={styles.modalContent}>Are you sure you want to add the item?</div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button className={styles.deleteBtn} onClick={() => addAdmin()}>
                  Add
                </button>
                <button className={styles.cancelBtn} onClick={() => setAddModalIsOpen(false)}>
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

export default ModalAdd;
