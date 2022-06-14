import React from 'react';
import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Input from '../Shared/Input';
import Modal from '../Shared/Modal';
import Button from '../Shared/Buttons/buttons';
import Dropdown from '../Shared/Dropdown/Dropdown';

const ModalEditAdmin = ({ admin, fetchAdmins, setShowEditModal, showEditModal }) => {
  const [EditModalIsOpen, setEditModalIsOpen] = useState(false);
  const [name, setName] = useState(admin.firstName);
  const [lastName, setLastName] = useState(admin.lastName);
  const [email, setEmail] = useState(admin.email);
  const [gender, setGender] = useState(admin.gender);
  const [status, setStatus] = useState(admin.active);
  const [password, setPassword] = useState(admin.password);
  useEffect(() => {
    setName(admin.firstName);
    setLastName(admin.lastName);
    setEmail(admin.email);
    setGender(admin.gender);
    setStatus(admin.status);
    setPassword(admin.password);
  }, [admin]);
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
      .then(() => setShowEditModal(false))
      .then(() => setEditModalIsOpen(false));
  };
  return (
    <Modal isOpen={showEditModal} setIsOpen={setShowEditModal}>
      <div className={styles.addModalContainer}>
        <div>
          <Input
            labelText={'Name'}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            labelText={'Last Name'}
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <Input
            labelText={'Email'}
            type={'text'}
            placeholder={'Email'}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <Input
            labelText={'Gender'}
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          <Dropdown
            label="Status"
            options={['true', 'false']}
            value={status}
            initialOption="Select a status"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
          <Input
            labelText={'Password'}
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <Button value="Submit" icons={'submit'} callback={editAdmin} />
    </Modal>
  );
};

export default ModalEditAdmin;
