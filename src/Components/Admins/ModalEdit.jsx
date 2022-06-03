import styles from './admins.module.css';

const ModalEdit = ({ setEditModalIsOpen, EditModalIsOpen, editAdmin }) => {
  if (EditModalIsOpen) {
    return (
      <>
        <div className={styles.darkBG} onClick={() => setEditModalIsOpen(false)} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>Dialog</h5>
            </div>
            <div className={styles.modalContent}>Are you sure you want to edit the item?</div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button className={styles.deleteBtn} onClick={() => editAdmin()}>
                  Edit
                </button>
                <button className={styles.cancelBtn} onClick={() => setEditModalIsOpen(false)}>
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

export default ModalEdit;
