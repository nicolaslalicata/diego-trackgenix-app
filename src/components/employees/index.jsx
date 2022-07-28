import { useEffect, useState } from 'react';
import styles from './index.module.css';
import ListEmployee from 'components/employees/list';
import Loader from 'components/shared/loading';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployees, getEmployees, editEmployee } from 'redux/employees/thunks';

const Employees = () => {
  const [editItem, setEditItem] = useState({
    firebaseUid: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    active: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.employees.isLoading);
  const list = useSelector((state) => state.employees.employeesList);

  useEffect(async () => {
    try {
      await getEmployees()(dispatch);
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  } else {
    return (
      <section className={styles.container}>
        <div>
          <ListEmployee
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            list={list}
            editEmployee={editEmployee}
            setEditItem={setEditItem}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            deleteItem={deleteEmployees}
            dispatch={dispatch}
            editItem={editItem}
          />
        </div>
      </section>
    );
  }
};
export default Employees;
