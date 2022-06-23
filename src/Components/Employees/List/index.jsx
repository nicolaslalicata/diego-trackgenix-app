import React from 'react';
import styles from './index.module.css';
import Table from '../../Shared/Table/Table';
import Button from '../../Shared/Buttons/buttons';
import { useState } from 'react';
import ModalDeleteEmp from '../Modal/modalDelete';
import EmployeeForm from '../EmployeeForm';
import { useSelector } from 'react-redux';

const ListEmployee = ({
  list,
  deleteItem,
  setIsEditModalOpen,
  setEditItem,
  setIsAddModalOpen,
  dispatch,
  isEditModalOpen,
  isAddModalOpen,
  addEmployee,
  editEmployee,
  editItem,
  isModalOpen,
  setIsModalOpen,
  isAdding,
  setIsAdding
}) => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [employeeItem, setemployeeItem] = useState({});
  const isLoading = useSelector((state) => state.employees.isLoading);
  console.log(isLoading);
  const getData = () => {
    return list.map((employee) => ({
      ...employee,
      edit: (
        <Button
          icons={'edit'}
          callback={() => {
            onEdit(employee);
          }}
        />
      ),
      delete: <Button icons={'delete'} callback={() => onDelete(employee)} />
    }));
  };
  console.log(list);
  // const handleEdit = (employee) => {
  //   setEditItem(employee);
  //   console.log(employee);
  //   // alert(`Employee ${employee.firstName} ready for edit`);
  // };

  const onDelete = (employee) => {
    setIsModalDeleteOpen(true);
    setemployeeItem(employee);
  };
  const onEdit = (employee) => {
    setIsEditModalOpen(true);
    setEditItem(employee);
  };
  return (
    <div className={styles.container}>
      <EmployeeForm
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        addEmployee={addEmployee}
        editEmployee={editEmployee}
        initialValue={editItem}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        dispatch={dispatch}
        employeeItem={employeeItem}
        setEditItem={setEditItem}
      />
      <ModalDeleteEmp
        setIsModalDeleteOpen={setIsModalDeleteOpen}
        isModalDeleteOpen={isModalDeleteOpen}
        employeeItem={employeeItem}
        deleteItem={deleteItem}
        dispatch={dispatch}
      />
      <Table
        data={getData()}
        objProp={['firstName', 'lastName', 'email', 'edit', 'delete']}
        headers={['First Name', 'Last name', 'email', 'Edit', 'Delete']}
      />
    </div>
  );
};
export default ListEmployee;
