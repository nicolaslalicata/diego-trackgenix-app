import React from 'react';
import { useEffect } from 'react';
import Modal from 'components/shared/modal';
import Button from 'components/shared/buttons';
import DropdownForm from 'components/shared/dropdownForm';
import styles from './admins.module.css';
import InputControlled from 'components/shared/inputControlled';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { createAdmin } from '../../redux/admins/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const ModalAddAdmin = ({ setShowAddModal, showAddModal, setSucModalIsOpen }) => {
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
        'string.pattern.base': 'The password must have letters and numbers'
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
        <div className={styles.modalButtons}>
          <Button value="Submit" icons={'submit'} />
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddAdmin;
