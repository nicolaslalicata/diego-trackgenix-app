import { useEffect, useState } from 'react';
import styles from './index.module.css';
import ListEmployee from './List';
import Button from '../Shared/Buttons/buttons';
import Loader from '../Shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployees, getEmployees, editEmployee } from '../../redux/employees/thunks';

const Employees = () => {
  const [employees, saveEmployees] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const list = useSelector((state) => state.employees.employeesList);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.employees.isLoading);
  console.log(isLoading);

  const url = `${process.env.REACT_APP_API_URL}/employees`;
  useEffect(() => {
    try {
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          saveEmployees(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(async () => {
    try {
      await getEmployees()(dispatch);
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  return (
    <section className={styles.container}>
      <div>
        <ListEmployee
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          Employees={list}
          editEmployee={editEmployee}
          saveEmployees={saveEmployees}
          setEditItem={setEditItem}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          deleteItem={deleteEmployees}
          dispatch={dispatch}
          isAddModalOpen={isAddModalOpen}
          // addEmployee={addEmployee}
          editItem={editItem}
        />
      </div>
    </section>
  );
};
export default Employees;
