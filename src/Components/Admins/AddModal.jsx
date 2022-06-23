import React from 'react';
import { useState, useEffect } from 'react';
import Modal from '../Shared/Modal/index';
import Button from '../Shared/Buttons/buttons';
import DropdownForm from '../Shared/dropdownForm/dropdownForm';
import styles from './admins.module.css';
import InputControlled from '../Shared/InputControlled';
import Joi, { required } from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { createAdmin } from '../../redux/admins/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const ModalAddAdmin = ({ setShowAddModal, showAddModal, setSucModalIsOpen }) => {
  const dispatch = useDispatch();

  const adminSchema = Joi.object({
    name: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
    gender: Joi.string().required(),
    status: Joi.string().required()
  });

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(adminSchema)
  });

  const addAdminHandler = ({ name, lastName, email, gender, status, password }, e) => {
    e.preventDefault();
    dispatch(createAdmin(name, lastName, email, gender, status, password));
    setShowAddModal(false);
    setSucModalIsOpen(true);
    reset();
  };

  useEffect(() => {
    reset();
  }, []);

  // const addAdmin = ({}, e) => {
  //   e.preventDefault();
  // }
  return (
    <Modal isOpen={showAddModal} setIsOpen={setShowAddModal}>
      <form onSubmit={handleSubmit(addAdminHandler)}>
        <div className={styles.addModalContainer}>
          <div>
            <InputControlled
              label={'Name'}
              type={'text'}
              name={'name'}
              placeholder="Name"
              register={register}
              required
              error={errors.name}
            />
            <InputControlled
              label={'Last Name'}
              type={'text'}
              name={'lastName'}
              placeholder="Last Name"
              register={register}
              required
              error={errors.lastName}
            />
            <InputControlled
              label={'Email'}
              type={'text'}
              name={'email'}
              placeholder="Email"
              register={register}
              required
              error={errors.email}
            />
          </div>
          <div>
            <DropdownForm
              label="Gender"
              options={['male', 'female', 'polygender']}
              name="gender"
              initialOption="Select a gender"
              required
              register={register}
              error={errors.gender}
            />
            <DropdownForm
              label="Status"
              options={['true', 'false']}
              name={'status'}
              required
              initialOption="Select a status"
              register={register}
              error={errors.status}
            />
            <InputControlled
              label={'Password'}
              type={'password'}
              name={'password'}
              placeholder="Password"
              register={register}
              required
              error={errors.password}
            />
          </div>
        </div>
        <Button value="Submit" icons={'submit'} />
      </form>
    </Modal>
  );
};

export default ModalAddAdmin;
