import React from 'react';
import Modal from 'components/shared/modal';
import styles from './time-sheets.module.css';
import { ButtonOption } from 'components/shared/buttonsOption';
import { useState } from 'react';

const ModalDeleteConfirmation = ({
  deleteTimeSheet,
  timeSheet,
  dispatch,
  setIsModalDelete,
  isModalDelete
}) => {
  const [isModalSuccess, setIsModalSuccess] = useState(false, { message: '' });

  const reset = () => {
    '';
  };
  return (
    <>
      <Modal isOpen={isModalDelete} setIsOpen={setIsModalDelete} title={'Delete'} reset={reset}>
        <div className={styles.modalHeader}></div>
        <h3>
          {`Delete ${timeSheet.employeeId.firstName} ${timeSheet.employeeId.lastName}'s timesheet?`}
        </h3>
        <div className={styles.modalActions}>
          <div className={styles.actionsContainer}>
            <ButtonOption
              callback={() => {
                deleteTimeSheet(timeSheet)(dispatch).then(
                  () => setIsModalDelete(false),
                  setIsModalSuccess(true)
                );
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
      <Modal isOpen={isModalSuccess} setIsOpen={setIsModalSuccess} title={'Success'} reset={reset}>
        <h1>Timesheet deleted</h1>
      </Modal>
    </>
  );
};

export default ModalDeleteConfirmation;
