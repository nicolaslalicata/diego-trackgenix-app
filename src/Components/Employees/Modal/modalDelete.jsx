import React from 'react';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Buttons/buttons';
// import { useDispatch } from 'react-redux';
// const dispatch = useDispatch();
const ModalDeleteEmp = ({
  setIsModalDeleteOpen,
  isModalDeleteOpen,
  deleteItem,
  employeeItem,
  dispatch
}) => {
  return (
    <Modal isOpen={isModalDeleteOpen} setIsOpen={setIsModalDeleteOpen}>
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
