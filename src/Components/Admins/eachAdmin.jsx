import React from 'react';
import styles from './admins.module.css';
import EditModalAdmin from './EditModalAdmin';
import { useState } from 'react';

const AdminItem = ({ admin, setAdmins, fetchAdmins }) => {
  const [boolean, setBoolean] = useState(false);
  function deleteAdmin() {
    fetch(`http://localhost:4000/admins/${admin._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then(fetchAdmins)
      .catch((err) => console.error(err));
  }
  return (
    <tr key={admin._id}>
      <td>{admin._id}</td>
      <td>{admin.lastName}</td>
      <td>{admin.firstName}</td>
      <td>{admin.email}</td>
      <td>
        {/* <EditModalAdmin modal={modal} setModal={setModal} /> */}
        <button
          onClick={() => {
            setBoolean(!boolean);
          }}
          className={styles.buttons}
        >
          Edit
        </button>
        <EditModalAdmin boolean={boolean}></EditModalAdmin>
      </td>
      <td>
        <button
          onClick={() => {
            deleteAdmin();
          }}
          className={styles.buttons}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AdminItem;
