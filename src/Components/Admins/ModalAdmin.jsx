import React from 'react';
import styles from './admins.module.css';
import { useState, useEffect } from 'react';

const ModalAdmin = ({ showModal, fetchAdmins, setShowModal }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [responseStatus, setResponseStatus] = useState(0);
  function emptyParameters() {
    setName('');
    setLastName('');
    setEmail('');
    setGender('');
    setStatus('');
    setPassword('');
    setResponseStatus(0);
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
        response.json(), setResponseStatus(response.status);
      })
      .then(responseStatus == 201 ? alert('add') : alert('error'))
      .then(fetchAdmins)
      .then(emptyParameters)
      .then(setShowModal(false));
  }
  if (showModal) {
    return (
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
              addAdmin({
                firstName: name,
                lastName: lastName,
                email: email,
                gender: gender,
                active: status,
                password: password
              });
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
    );
  } else {
    return false;
  }
};

export default ModalAdmin;
