import React from 'react';
import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Input from '../Shared/Input';
import Modal from '../Shared/Modal';
import Button from '../Shared/Buttons/buttons';
import Dropdown from '../Shared/Dropdown/Dropdown';
import { editAdmin } from '../../redux/admins/thunks';
import { useDispatch, useSelector } from 'react-redux/es/exports';

const ModalEditAdmin = ({ admin, setShowEditModal, showEditModal }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    setName(admin.firstName);
    setLastName(admin.lastName);
    setEmail(admin.email);
    setGender(admin.gender);
    setStatus(admin.status);
    setPassword(admin.password);
  }, [admin]);
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
          <Dropdown
            label="Gender"
            options={['male', 'female', 'polygender']}
            value={gender}
            initialOption="Select a gender"
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
      <Button
        value="Submit"
        icons={'submit'}
        callback={() => {
          editAdmin(
            name,
            lastName,
            email,
            gender,
            status,
            password,
            setShowEditModal,
            admin
          )(dispatch).then(() => setShowEditModal(false));
        }}
      />
    </Modal>
  );
};

export default ModalEditAdmin;
