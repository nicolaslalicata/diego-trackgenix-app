require('dotenv').config();
import { useState, useEffect } from 'react';
import React from 'react';
import Row from '../Row';
import styles from '../List/list.module.css';

function List() {
  const [superAdmins, setSuperAdmins] = useState([]);
  const url = `${process.env.REACT_APP_API_URL}/super-admins`;
  useEffect(() => {
    try {
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          setSuperAdmins(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteRow = async (_id) => {
    const response = confirm('You are deleting a super admin. Are you sure?');
    if (response) {
      await fetch(`${url}/${_id}`, {
        method: 'DELETE'
      });
      setSuperAdmins(superAdmins.filter((row) => row._id !== _id));
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th id="Name">Name</th>
            <th id="LastName">Last name</th>
            <th id="Email">Email</th>
            <th id="Password">Password</th>
          </tr>
        </thead>
        <tbody>
          {superAdmins.map((superAdmin) => (
            <Row key={superAdmin._id} row={superAdmin} deleteRow={deleteRow} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
