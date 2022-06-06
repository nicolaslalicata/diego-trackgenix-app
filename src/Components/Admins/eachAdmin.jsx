import React from 'react';
import styles from './admins.module.css';
import EditModalAdmin from './EditModalAdmin';
import { useState } from 'react';
import ModalDelete from './ModalDelete';

const AdminItem = ({ admin, fetchAdmins }) => {
  const [editModal, setEditModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
        <ModalDelete setIsOpen={setIsOpen} isOpen={isOpen} deleteAdmin={deleteAdmin} />
        <button
          onClick={() => {
            setEditModal(true);
          }}
          className={styles.buttons}
        >
          Edit
        </button>
        <EditModalAdmin
          editModal={editModal}
          admin={admin}
          setEditModal={setEditModal}
          fetchAdmins={fetchAdmins}
        ></EditModalAdmin>
      </td>
      <td>
        <button
          onClick={() => {
            setIsOpen(true);
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
