import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

const EmployeeForm = ({ addEmployee, editEmployee, initialValue }) => {
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

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
      addEmployee({
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

  return (
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
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};
export default EmployeeForm;
