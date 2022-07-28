import React from 'react';
import styles from './index.module.css';
import Table from 'components/shared/table';
import Button from 'components/shared/buttons';
import { useState } from 'react';
import ModalDeleteEmp from 'components/employees/modal/modalDelete';
import EmployeeForm from 'components/employees/employeeForm';
// import { useSelector } from 'react-redux';

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
  // const isLoading = useSelector((state) => state.employees.isLoading);
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
        objProp={['firstName', 'lastName', 'email', 'phone', 'active', 'edit', 'delete']}
        headers={['First Name', 'Last name', 'email', 'Phone', 'active', 'Edit', 'Delete']}
      />
    </div>
  );
};
export default ListEmployee;
