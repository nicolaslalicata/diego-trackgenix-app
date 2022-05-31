import React from 'react';
import styles from './admins.module.css';
import EditModalAdmin from './EditModalAdmin';
import { useState } from 'react';

const AdminItem = ({ admin, fetchAdmins }) => {
  const [boolean, setBoolean] = useState(false);
  function deleteAdmin() {
    fetch(`${process.env.REACT_APP_API_URL}/admins/${admin._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(fetchAdmins)
      .catch((err) => console.error(err));
  }
  return (
    <tr key={admin._id}>
      <td>{admin.lastName}</td>
      <td>{admin.firstName}</td>
      <td>{admin.email}</td>
      <td>
        <button
          onClick={() => {
            setBoolean(!boolean);
          }}
          className={styles.buttons}
        >
          Edit
        </button>
        <EditModalAdmin
          boolean={boolean}
          admin={admin}
          setBoolean={setBoolean}
          fetchAdmins={fetchAdmins}
        ></EditModalAdmin>
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
