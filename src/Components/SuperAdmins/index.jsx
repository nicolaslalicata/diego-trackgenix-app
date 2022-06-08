import React, { useState, useEffect } from 'react';
// import List from './List';
import styles from './super-admins.module.css';
import Button from '../Shared/Buttons/buttons';
import Table from '../Shared/Table/Table';
// import Modal from '../Shared/Modal/Modal';

function SuperAdmins() {
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
  // const [isOpen, setIsOpen] = useState(false);

  const headers = ['_id', 'firstName', 'lastName', 'email', 'password'];
  return (
    <section className={styles.container}>
      <div>
        <h2>SuperAdmins</h2>
        <a href="/super-admins/form">
          <Button icons={'add'} />
          {/* <Button icons={'add'} onClick={setIsOpen(true)} /> */}
        </a>
        {/* <List /> */}
        <Table
          data={superAdmins}
          headers={headers}
          actions={
            <>
              <Button icons={'edit'} />
              <Button icons={'delete'} />
            </>
          }
        />
      </div>
    </section>
  );
}

export default SuperAdmins;
