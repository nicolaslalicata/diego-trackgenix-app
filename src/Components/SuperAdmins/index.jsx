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
  addSuperAdmin,
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
  const superAdmins = useSelector((state) => state.superAdmins.List);
  const isLoading = useSelector((state) => state.superAdmins.isLoading);
  const error = useSelector((state) => state.superAdmins.error);

  const [id, setId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [modalNotification, setModalNotification] = useState(false, { message: '' });

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
  }, []);

  const getById = (id) => {
    setIsOpenEdit(true);
    formFiller(id);
  };

  const formFiller = (id) => {
    const valuesForm = superAdmins.filter((superadmin) => superadmin._id === id);
    setFirstName(valuesForm[0].firstName);
    setLastName(valuesForm[0].lastName);
    setEmail(valuesForm[0].email);
    setPassword(valuesForm[0].password);
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

  // HANDLERS REDUX
  const handleDeleteSuperAdmin = (superAdmID) => {
    dispatch(deleteSuperAdmin(superAdmID, setIsOpen, setModalNotification));
  };

  const handleCreateSuperAdmin = () => {
    if (firstName && lastName && email && password) {
      dispatch(
        addSuperAdmin({ firstName, lastName, email, password }, setIsOpenAdd, setModalNotification)
      );
    } else {
      setModalNotification({
        modalNotification: true,
        message: 'Please complete all the fields'
      });
    }
  };

  const handleEditSuperAdmin = (superAdmin) => {
    if (firstName && lastName && email && password) {
      dispatch(editSuperAdmin(superAdmin, id, setIsOpenEdit, setModalNotification));
    } else {
      setModalNotification({
        modalNotification: true,
        message: 'Please complete all the fields'
      });
    }
  };

  const headers = ['Name', 'Last Name', 'Email', 'Password', 'Edit', 'Delete'];
  const objProp = ['firstName', 'lastName', 'email', 'password', 'edit', 'delete'];
  if (error) {
    return <Loader isLoading={isLoading} />;
  }
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  } else {
    return (
      <section className={styles.container}>
        <Button
          icons={'add'}
          callback={() => {
            resetInputs();
            setIsOpenAdd(true);
          }}
        />
        {/* MODAL DELETE */}
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={'Delete'}>
          <h3>Are you sure you want to delete this Super Admin?</h3>
          <Button callback={() => handleDeleteSuperAdmin(id)} text={'Delete'} />
        </Modal>
        {/* MODAL ADD */}
        <Modal isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} title={'Add'}>
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
                handleCreateSuperAdmin({ firstName, lastName, email, password });
              }}
            />
          </form>
        </Modal>
        {/* MODAL EDIT */}
        <Modal isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} title={'Edit'}>
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
        {/* MODAL NOTIFICATION */}
        <Modal
          isOpen={modalNotification}
          setIsOpen={setModalNotification}
          message={modalNotification.message}
          title={'Notification'}
        >
          <Button callback={() => setModalNotification(false)} text={'OK'} />
        </Modal>
        <Table data={getData()} objProp={objProp} headers={headers} />
      </section>
    );
  }
}

export default SuperAdmins;
