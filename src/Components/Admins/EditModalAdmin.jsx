import React from 'react';
import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Buttons/buttons';
import DropdownForm from '../Shared/dropdownForm/dropdownForm';
import InputControlled from '../Shared/InputControlled';
import Joi, { required } from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { createAdmin } from '../../redux/admins/thunks';
import { useForm } from 'react-hook-form';
import { editAdmin } from '../../redux/admins/thunks';
import { useDispatch } from 'react-redux/es/exports';

const ModalEditAdmin = ({ admin, setShowEditModal, showEditModal, setSucModalIsOpen }) => {
  const dispatch = useDispatch();

  const adminSchema = Joi.object({
    name: Joi.string()
      .required()
      .trim()
      .min(3)
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
      .messages({
        'string.pattern.base': 'There are invalid characters'
      }),
    lastName: Joi.string()
      .required()
      .trim()
      .min(3)
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
      .messages({
        'string.pattern.base': 'There are invalid characters'
      }),
    email: Joi.string()
      .required()
      .regex(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)
      .messages({
        'string.pattern.base': 'There are invalid characters'
      }),
    password: Joi.string()
      .required()
      .min(8)
      .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
      .messages({
        'string.pattern.base': 'There are invalid characters'
      }),
    gender: Joi.string().required(),
    status: Joi.string().required()
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(adminSchema)
  });

  const editAdminHandler = ({ name, lastName, email, gender, status, password }, e) => {
    e.preventDefault();
    dispatch(editAdmin(name, lastName, email, gender, status, password, admin));
    setShowEditModal(false);
    setSucModalIsOpen(true);
    reset();
  };

  useEffect(() => {
    reset({
      name: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      gender: admin.gender,
      status: admin.status,
      password: admin.password
    });
  }, [admin]);

  return (
    <Modal isOpen={showEditModal} setIsOpen={setShowEditModal}>
      <form onSubmit={handleSubmit(editAdminHandler)}>
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
        <div className={styles.modalButtons}>
          <Button value="Submit" icons={'submit'} />
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditAdmin;
