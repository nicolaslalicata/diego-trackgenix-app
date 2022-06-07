import React from 'react';
import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';

function Form() {
  let initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  const params = window.location.search;
  let superAdminId = params.substring(4);
  const url = `${process.env.REACT_APP_API_URL}/super-admins`;
  const urlEdit = `${url}/${superAdminId}`;

  useEffect(() => {
    try {
      fetch(urlEdit)
        .then((response) => response.json())
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPassword(response.data.password);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [firstName, setFirstName] = useState(initialValues.firstName);
  const [lastName, setLastName] = useState(initialValues.lastName);
  const [email, setEmail] = useState(initialValues.email);
  const [password, setPassword] = useState(initialValues.password);
  const [superAdmins, setSuperAdmins] = useState([]);

  const newSuperAdmin = async (superAdmin) => {
    const confirmation = confirm('Are you sure you want to create this user?');
    if (confirmation) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (response.status === 200 || response.status === 201) {
        setSuperAdmins([...superAdmins, data]);
        alert('Super admin created successfully');
      } else {
        alert(data.message);
      }
    }
  };

  const editSuperAdmin = async (superAdmin) => {
    const confirmation = confirm('Are you sure you want to edit this user?');
    if (confirmation) {
      const response = await fetch(urlEdit, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (response.status === 200 || response.status === 201) {
        setSuperAdmins([...superAdmins, data]);
        alert('Super admin edited successfully');
        superAdminId = '';
      } else {
        alert(data.message);
      }
    }
  };

  const onSubmit = (submitSuperAdmin) => {
    submitSuperAdmin.preventDefault();
    if (superAdminId !== '') {
      editSuperAdmin({ firstName, lastName, email, password });
    } else {
      if (!firstName || !lastName || !email || !password) {
        alert('Please complete all inputs');
        return;
      }
      newSuperAdmin({ firstName, lastName, email, password });
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div>
      <a href="/super-admins">
        <button className={styles.backButton}>Back to list</button>
      </a>
      <form className={styles.container} onSubmit={onSubmit}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <Input
              labelText={'First Name:'}
              type={'text'}
              value={firstName}
              placeholder={'First name'}
              onChange={(submitSuperAdmin) => setFirstName(submitSuperAdmin.target.value)}
            />
          </div>
          <div className={styles.card}>
            <Input
              labelText={'Last Name:'}
              type={'text'}
              value={lastName}
              placeholder={'Last name'}
              onChange={(submitSuperAdmin) => setLastName(submitSuperAdmin.target.value)}
            />
          </div>
          <div className={styles.card}>
            <Input
              labelText={'Email:'}
              type={'email'}
              value={email}
              placeholder={'Email'}
              onChange={(submitSuperAdmin) => setEmail(submitSuperAdmin.target.value)}
            />
          </div>
          <div className={styles.card}>
            <Input
              labelText={'Password:'}
              type={'password'}
              value={password}
              placeholder={'Password'}
              onChange={(submitSuperAdmin) => setPassword(submitSuperAdmin.target.value)}
            />
          </div>
        </div>
        <input className={styles.submitButton} type="submit" value="Submit" />
      </form>
    </div>
  );
}
export default Form;
