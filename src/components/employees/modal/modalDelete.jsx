import React from 'react';
import Modal from 'components/shared/modal';
import { ButtonOption } from 'components/shared/buttonsOption';

const ModalDeleteEmp = ({
  setIsModalDeleteOpen,
  isModalDeleteOpen,
  deleteItem,
  employeeItem,
  dispatch
}) => {
  return (
    <Modal isOpen={isModalDeleteOpen} setIsOpen={setIsModalDeleteOpen} title={'Delete Employee'}>
      <div>Do you want to delete this employee?</div>
      <div>
        <ButtonOption
          option={'yes'}
          callback={() => {
            deleteItem(employeeItem)(dispatch);
            setIsModalDeleteOpen(false);
          }}
          text={'Confirm'}
        ></ButtonOption>
        <ButtonOption
          option={'no'}
          callback={() => {
            setIsModalDeleteOpen(false);
          }}
          text={'Cancel'}
        ></ButtonOption>
      </div>
    </Modal>
  );
};

export default ModalDeleteEmp;
