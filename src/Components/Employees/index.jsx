import { useEffect, useState } from 'react';
import styles from './index.module.css';
import ListEmployee from './List';
import EmployeeForm from './EmployeeForm';
import Button from '../Shared/Buttons/buttons';

const Employees = () => {
  const [employees, saveEmployees] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

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

  //DELETE ITEM
  const deleteItem = async (id) => {
    await fetch(`${url}/${id}`, {
      method: 'DELETE'
    });
    saveEmployees([...employees.filter((listItem) => listItem._id != id)]);
  };

  //ADD NEW ITEM
  const addEmployee = async ({ firstName, lastName, email, password }) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        })
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          saveEmployees([...employees, data.data]);
          alert(`Employee ${firstName} added successfully`);
          setIsAddModalOpen(false);
        });
    } catch (error) {
      setIsAddModalOpen(false);
      alert(`There was an error`);
    }
  };

  //EDIT
  const editEmployee = async ({ firstName, lastName, email, password }) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/employees/${editItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (!firstName || !lastName || !email || !password) {
            alert('Incomplete data');
            setEditItem(null);
            setIsEditModalOpen(false);
          } else {
            const employeesUpdated = employees.map((emp) => {
              if (emp._id === data.data._id) {
                return data.data;
              } else return emp;
            });
            saveEmployees(employeesUpdated);
            setEditItem(null);
            alert(`The employee ${firstName} was edited`);
            setIsEditModalOpen(false);
          }
        });
    } catch (error) {
      alert('There was an error with an input');
      setEditItem(null);
      console.error(error);
      setIsEditModalOpen(false);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <Button
        callback={() => {
          setIsAddModalOpen(true);
          setEditItem(null);
          setIsAdding(true);
        }}
        icons={'add'}
      ></Button>
      <div>
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
        />
        <ListEmployee
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          Employees={employees}
          editEmployee={editEmployee}
          saveEmployees={saveEmployees}
          setEditItem={setEditItem}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          deleteItem={deleteItem}
        />
      </div>
    </section>
  );
};
export default Employees;
