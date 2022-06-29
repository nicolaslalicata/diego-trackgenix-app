import React from 'react';
import Modal from 'components/shared/modal';
import Button from 'components/shared/buttons';
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
      <Button
        text={'YES'}
        callback={() => {
          deleteItem(employeeItem)(dispatch);
          setIsModalDeleteOpen(false);
        }}
      />
      <Button
        text={'NO'}
        callback={() => {
          setIsModalDeleteOpen(false);
        }}
      />
    </Modal>
  );
};

export default ModalDeleteEmp;
