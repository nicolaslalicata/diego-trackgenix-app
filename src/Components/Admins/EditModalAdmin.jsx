import React from 'react';
import { useState } from 'react';
import styles from './admins.module.css';
import ModalEdit from './ModalEdit';

const ModalEditAdmin = ({
  editModal,
  admin,
  fetchAdmins,
  setEditModal,
  setSucModalIsOpen,
  setErrModalIsOpen
}) => {
  const [EditModalIsOpen, setEditModalIsOpen] = useState(false);
  const [name, setName] = useState(admin.firstName);
  const [lastName, setLastName] = useState(admin.lastName);
  const [email, setEmail] = useState(admin.email);
  const [gender, setGender] = useState(admin.gender);
  const [status, setStatus] = useState(admin.active);
  const [password, setPassword] = useState(admin.password);
  const editAdmin = () => {
    fetch(`${process.env.REACT_APP_API_URL}/admins/${admin._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: name,
        lastName: lastName,
        email: email,
        gender: gender,
        active: status,
        password: password
      })
    })
      .then((response) => {
        response.json(),
          response.status == 201
            ? alert(`Admin edited successfully`)
            : alert(`there was a problem editing the admin`);
      })
      .then(fetchAdmins)
      .then(() => setEditModal(false))
      .then(() => setEditModalIsOpen(false));
  };
  if (editModal) {
    return (
      <>
        <div className={styles.modal}>
          <input
            type="text"
            value={name}
            placeholder={'Name'}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            value={lastName}
            placeholder={'Last Name'}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <input
            type="text"
            value={email}
            placeholder={'Email'}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            value={gender}
            placeholder={'Gender'}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          <input
            type="text"
            value={status}
            placeholder="Status"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
          <input
            type="text"
            value={password}
            placeholder={'Password'}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={() => setEditModalIsOpen(true)} className={styles.buttons}>
            Send
          </button>
          <button onClick={() => setEditModal(false)} className={styles.buttons}>
            Cancel
          </button>
        </div>
        <ModalEdit
          setEditModalIsOpen={setEditModalIsOpen}
          EditModalIsOpen={EditModalIsOpen}
          editAdmin={editAdmin}
        />
      </>
    );
  } else return false;
};

export default ModalEditAdmin;
