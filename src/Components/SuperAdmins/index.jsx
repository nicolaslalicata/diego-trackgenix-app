import React, { useState, useEffect } from 'react';
// import List from './List';
import styles from './super-admins.module.css';
import Button from '../Shared/Buttons/buttons';
import Table from '../Shared/Table/Table';
import Modal from '../Shared/Modal/Modal';

function SuperAdmins() {
  const [superAdmins, setSuperAdmins] = useState([]);
  const url = `${process.env.REACT_APP_API_URL}/super-admins`;
  const [id, setId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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

  const getData = () => {
    return superAdmins.map((superAdmin) => ({
      ...superAdmin,
      edit: (
        <Button
          icons="edit"
          // callback={() => {
          //   onEdit(superAdmin);
          // }}
        />
      ),
      delete: (
        <Button
          icons="delete"
          callback={() => {
            setIsOpen(true);
            setId(superAdmin._id);
          }}
        />
      )
    }));
  };

  const deleteRow = async (_id) => {
    const resp = await fetch(`${url}/${_id}`, {
      method: 'DELETE'
    });
    const data = resp.json;
    console.log(data);
    console.log(resp);
    if (resp.status === 200) {
      setSuperAdmins(superAdmins.filter((row) => row._id !== _id));
      setIsOpen(false);
    } else {
      alert('There has been an error');
    }
  };

  const headers = ['_id', 'firstName', 'lastName', 'email', 'password', 'edit', 'delete'];
  return (
    <section className={styles.container}>
      <div>
        <h2>SuperAdmins</h2>
        <a href="/super-admins/form">
          <Button icons={'add'} />
          {/* <Button icons={'add'} onClick={setIsOpen(true)} /> */}
        </a>
        {/* <List /> */}
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <h1>modal test</h1>
          <Button callback={() => deleteRow(id)} text={'Delete'} />
        </Modal>
        <Table data={getData()} headers={headers} />
      </div>
    </section>
  );
}

export default SuperAdmins;
