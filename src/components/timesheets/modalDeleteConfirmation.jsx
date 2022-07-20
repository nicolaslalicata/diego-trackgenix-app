import React from 'react';
import Modal from 'components/shared/modal';
import styles from './time-sheets.module.css';
import Button from 'components/shared/buttons';
import { ButtonOption } from 'components/shared/buttonsOption';

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
          <ButtonOption
            callback={() => {
              deleteTimeSheet(timeSheet)(dispatch).then(() => setIsModalDelete(false));
            }}
            option={'yes'}
            text={'Confirm'}
          ></ButtonOption>
          <ButtonOption
            option={'no'}
            callback={() => setIsModalDelete(false)}
            text={'Cancel'}
          ></ButtonOption>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteConfirmation;
