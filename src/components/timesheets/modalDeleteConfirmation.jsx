import React from 'react';
import Modal from 'components/shared/modal';
import styles from './time-sheets.module.css';
import Button from 'components/shared/buttons';
const ModalDeleteConfirmation = ({
  deleteTimeSheet,
  timeSheet,
  dispatch,
  setIsModalDelete,
  isModalDelete
}) => {
  return (
    <Modal isOpen={isModalDelete} setIsOpen={setIsModalDelete} title={'Delete'}>
      <div className={styles.modalHeader}>
        <h5 className={styles.heading}>Confirmation</h5>
      </div>
      <div>Are you sure you want to delete the item?</div>
      <div className={styles.modalActions}>
        <div className={styles.actionsContainer}>
          <Button
            callback={() => {
              deleteTimeSheet(timeSheet)(dispatch).then(() => setIsModalDelete(false));
            }}
            text={'Delete'}
          />
          <Button
            callback={() => {
              setIsModalDelete(false);
            }}
            text={'Cancel'}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteConfirmation;
