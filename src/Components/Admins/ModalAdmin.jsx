import React from 'react';
import styles from './admins.module.css';
import { useState } from 'react';
import ModalAdd from './ModalAdd';

const ModalAdmin = ({
  showModal,
  fetchAdmins,
  setShowModal,
  setSucModalIsOpen,
  setErrModalIsOpen
}) => {
  const [AddModalIsOpen, setAddModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  function emptyParameters() {
    setName('');
    setLastName('');
    setEmail('');
    setGender('');
    setStatus('');
    setPassword('');
  }
  function addAdmin() {
    fetch(`${process.env.REACT_APP_API_URL}/admins/`, {
      method: 'POST',
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
            ? alert(`Admin added successfully`)
            : alert(`there was a problem adding the admin: ${response.message}`);
      })
      .then(fetchAdmins)
      .then(emptyParameters)
      .then(setShowModal(false))
      .then(setAddModalIsOpen(false));
  }
  if (showModal) {
    return (
      <>
        <ModalAdd
          setAddModalIsOpen={setAddModalIsOpen}
          AddModalIsOpen={AddModalIsOpen}
          addAdmin={addAdmin}
        />
        <div className={styles.modal}>
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Status"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span className={styles.modalContainer}>
            <button
              onClick={() => {
                setAddModalIsOpen(true);
              }}
              className={styles.buttons}
            >
              Send
            </button>
            <button
              className={styles.buttons}
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </button>
          </span>
        </div>
      </>
    );
  } else {
    return false;
  }
};

export default ModalAdmin;
