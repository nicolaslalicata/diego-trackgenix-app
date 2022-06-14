import React from 'react';
import { useState } from 'react';
import Modal from '../Shared/Modal/index';
import Input from '../Shared/Input';
import Button from '../Shared/Buttons/buttons';
import Dropdown from '../Shared/Dropdown/Dropdown';
import styles from './admins.module.css';

const ModalAddAdmin = ({ setShowAddModal, showAddModal, fetchAdmins }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');

  const handlePost = () => {
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
          response.status === 201
            ? alert('Added successfully')
            : alert('There was an error during creation');
      })
      .then(fetchAdmins)
      .then(() => {
        setShowAddModal(false),
          setName(''),
          setLastName(''),
          setEmail(''),
          setGender(''),
          setStatus(''),
          setPassword('');
      });
  };
  return (
    <Modal isOpen={showAddModal} setIsOpen={setShowAddModal}>
      <div className={styles.addModalContainer}>
        <div>
          <Input
            labelText={'Name'}
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            labelText={'Last Name'}
            type="text"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <Input
            labelText={'Email'}
            type={'text'}
            placeholder={'Email'}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <Dropdown
            label="Gender"
            options={['male', 'female', 'polygender']}
            value={gender}
            initialOption="Select a gender"
            onChange={(e) => {
              setStatus(e.target.value);
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.modalButtons}>
        <Button text={'Add'} callback={handlePost}>
          Add
        </Button>
        <Button
          text={'Cancel'}
          callback={() => {
            setShowAddModal(false);
          }}
        ></Button>
      </div>
    </Modal>
  );
};

export default ModalAddAdmin;
