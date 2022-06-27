import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import Button from '../../Shared/Buttons/buttons';
import Modal from '../../Shared/Modal';
import { addNewEmployee } from '../../../redux/employees/thunks';

const EmployeeForm = ({
  editEmployee,
  // isAddModalOpen,
  initialValue,
  isEditModalOpen,
  setIsEditModalOpen,
  setIsAdding,
  setEditItem,
  dispatch
}) => {
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // const dispatch = useDispatch();

  useEffect(() => {
    if (initialValue) {
      setPassword(initialValue.password);
      setFirstName(initialValue.firstName);
      setLastName(initialValue.lastName);
      setEmail(initialValue.email);
    }
  }, [initialValue]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (initialValue) {
      editEmployee({
        firstName,
        lastName,
        email,
        password
      });
    } else {
      addNewEmployee({
        firstName,
        lastName,
        email,
        password
      });
    }
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };
  console.log(`${isAddModalOpen}`);
  return (
    <section>
      <div className={styles.employeeForm}>
        <div className={styles.employeeTitle}>
          <h2>Employees</h2>
          <Button
            callback={() => {
              setIsAddModalOpen(true);
              setEditItem(null);
            }}
            icons={'add'}
          ></Button>
        </div>
        <Modal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen}>
          <div className={styles.container}>
            <div className={styles.title}>
              <h2>Add new Employee</h2>
            </div>
            <form className={styles.containerForm} onSubmit={onSubmit}>
              <div className={styles.formItem}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={styles.formItem}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className={styles.formItem}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.formItem}>
                <label>password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.formItemSend}>
                <Button
                  type="submit"
                  value="Submit"
                  icons={'submit'}
                  callback={() => {
                    addNewEmployee(firstName, lastName, email, password)(dispatch);
                  }}
                />
              </div>
              <div className={styles.formItemSend}>
                <Button
                  text="Cancel"
                  callback={() => {
                    setIsAddModalOpen(false);
                  }}
                />
              </div>
            </form>
          </div>
        </Modal>
        <Modal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen}>
          <div className={styles.container}>
            <div className={styles.title}>
              <h2>Edit employee</h2>
            </div>
            <form className={styles.containerForm} onSubmit={onSubmit}>
              <div className={styles.formItem}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={styles.formItem}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className={styles.formItem}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.formItem}>
                <label>password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.formItemSend}>
                <Button
                  type="submit"
                  value="Submit"
                  icons={'submit'}
                  callback={() => {
                    editEmployee(
                      initialValue,
                      firstName,
                      lastName,
                      email,
                      password,
                      setEditItem,
                      setIsEditModalOpen
                    )(dispatch);
                  }}
                />
              </div>
              <div className={styles.formItemSend}>
                <Button
                  text="Cancel"
                  callback={() => {
                    setIsEditModalOpen(false);
                  }}
                />
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </section>
  );
};
export default EmployeeForm;
