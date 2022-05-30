import React from 'react';
import styles from './admins.module.css';
import { useState } from 'react';

const ModalAdmin = ({ modal }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  // const [listAdmins, setListAdmins] = useState({});
  function addAdmin(data) {
    fetch(`http://localhost:4000/admins/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      // .then((response) => setListAdmins(response))
      .catch((err) => console.error(err));
    console.log(data);
  }
  if (modal) {
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
      </div>
    );
  } else {
    return false;
  }
};

export default ModalAdmin;
