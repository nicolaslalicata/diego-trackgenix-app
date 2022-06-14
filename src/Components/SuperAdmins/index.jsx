import React, { useState, useEffect } from 'react';
import styles from './super-admins.module.css';
import Button from '../Shared/Buttons/buttons';
import Table from '../Shared/Table/Table';
import Modal from '../Shared/Modal/index';
import Input from '../Shared/Input';
import Loader from '../Shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSuperAdmins,
  deleteSuperAdmin,
  newSuperAdmin,
  editSuperAdmin
} from '../../redux/superAdmins/thunks';

function SuperAdmins() {
  let initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  // REDUX
  const dispatch = useDispatch();
  const superAdmins = useSelector((state) => state.superAdmins.superAdminsList);

  // const [superAdmins, setSuperAdmins] = useState([]);
  const [id, setId] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [firstName, setFirstName] = useState(initialValues.firstName);
  const [lastName, setLastName] = useState(initialValues.lastName);
  const [email, setEmail] = useState(initialValues.email);
  const [password, setPassword] = useState(initialValues.password);

  const resetInputs = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    dispatch(getSuperAdmins());
    setIsLoading(false);
  }, []);

  const getById = (ids) => {
    setIsOpenEdit(true);
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/${ids}`)
      .then((response) => response.json())
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPassword(response.data.password);
      });
  };
  const getData = () => {
    return superAdmins.map((superAdmin) => ({
      ...superAdmin,
      edit: (
        <Button
          icons="edit"
          callback={() => {
            setId(superAdmin._id);
            getById(superAdmin._id);
          }}
        />
      ),
      delete: (
        <Button
          icons="delete"
          callback={() => {
            setIsOpen(true);
            setId(superAdmin._id);
          }}
        />
      )
    }));
  };

  ////////////////////////////methods redux//////////////////////////////////////////////
  const handleDeleteSuperAdmin = (superAdmID) => {
    dispatch(deleteSuperAdmin(superAdmID));
    alert('Super admin deleted successfully');
    setIsOpen(false);
  };

  const handleNewSuperAdmin = () => {
    dispatch(newSuperAdmin({ firstName, lastName, email, password }));
    alert('Super admin created successfully');
    setIsOpenAdd(false);
  };

  const handleEditSuperAdmin = (superAdmin) => {
    dispatch(editSuperAdmin(superAdmin, id));
    setIsOpenEdit(false);
    alert('Super admin edited successfully');
  };

  const headers = ['First Name', 'Last Name', 'Email', 'Password', 'Edit', 'Delete'];
  const objProp = ['firstName', 'lastName', 'email', 'password', 'edit', 'delete'];
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  } else {
    return (
      <section className={styles.container}>
        <h2>SuperAdmins</h2>
        <Button
          icons={'add'}
          callback={() => {
            resetInputs();
            setIsOpenAdd(true);
          }}
        />
        {/* MODAL DELETE */}
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <h3>Are you sure you want to delete this Super Admin?</h3>
          <Button callback={() => handleDeleteSuperAdmin(id)} text={'Delete'} />
        </Modal>
        {/* MODAL ADD */}
        <Modal isOpen={isOpenAdd} setIsOpen={setIsOpenAdd}>
          <h3>Add new super admin</h3>
          <form className={styles.containerForm}>
            <Input
              labelText={'First Name:'}
              type={'text'}
              value={firstName}
              placeholder={'First name'}
              onChange={(submitSuperAdmin) => setFirstName(submitSuperAdmin.target.value)}
            />
            <Input
              labelText={'Last Name:'}
              type={'text'}
              value={lastName}
              placeholder={'Last name'}
              onChange={(submitSuperAdmin) => setLastName(submitSuperAdmin.target.value)}
            />
            <Input
              labelText={'Email:'}
              type={'email'}
              value={email}
              placeholder={'Email'}
              onChange={(submitSuperAdmin) => setEmail(submitSuperAdmin.target.value)}
            />
            <Input
              labelText={'Password:'}
              type={'password'}
              value={password}
              placeholder={'Password'}
              onChange={(submitSuperAdmin) => setPassword(submitSuperAdmin.target.value)}
            />
            <Button
              value="Submit"
              icons={'submit'}
              callback={(noRefresh) => {
                noRefresh.preventDefault();
                handleNewSuperAdmin({ firstName, lastName, email, password });
              }}
            />
          </form>
        </Modal>
        {/* MODAL EDIT */}
        <Modal isOpen={isOpenEdit} setIsOpen={setIsOpenEdit}>
          <h3>Edit super admin</h3>
          <form className={styles.containerForm}>
            <Input
              labelText={'First Name:'}
              type={'text'}
              value={firstName}
              onChange={(submitSuperAdmin) => setFirstName(submitSuperAdmin.target.value)}
            />
            <Input
              labelText={'Last Name:'}
              type={'text'}
              value={lastName}
              onChange={(submitSuperAdmin) => setLastName(submitSuperAdmin.target.value)}
            />
            <Input
              labelText={'Email:'}
              type={'email'}
              value={email}
              onChange={(submitSuperAdmin) => setEmail(submitSuperAdmin.target.value)}
            />
            <Input
              labelText={'Password:'}
              type={'password'}
              value={password}
              onChange={(submitSuperAdmin) => setPassword(submitSuperAdmin.target.value)}
            />
            <Button
              value="Submit"
              icons={'submit'}
              callback={(noRefresh) => {
                noRefresh.preventDefault();
                handleEditSuperAdmin({ firstName, lastName, email, password });
              }}
            />
          </form>
        </Modal>
        <Table data={getData()} objProp={objProp} headers={headers} />
      </section>
    );
  }
}

export default SuperAdmins;
