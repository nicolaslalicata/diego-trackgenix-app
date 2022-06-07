import styles from './time-sheets.module.css';

const ModalAdd = ({ setAddModalIsOpen, addModalIsOpen, handleEdit, setShowModalEdit }) => {
  return addModalIsOpen ? (
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
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  handleEdit(), setAddModalIsOpen(false), setShowModalEdit(false);
                }}
              >
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
  ) : null;
};

export default ModalAdd;
