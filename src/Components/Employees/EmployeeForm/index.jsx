import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import Button from '../../Shared/Buttons/buttons';
import Modal from '../../Shared/Modal';
import InputControlled from '../../Shared/InputControlled';
import { addNewEmployee } from '../../../redux/employees/thunks';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';

const EmployeeForm = ({
  editEmployee,
  initialValue,
  isEditModalOpen,
  setIsEditModalOpen,
  setEditItem,
  dispatch
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const employeeSchema = Joi.object({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().required(),
    password: Joi.string().required().min(8)
  });

  const defaultValue = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  // useEffect(() => {
  //   if (initialValue) {
  //     setValue('firstName', initialValue.firstName);
  //     setValue('lastName', initialValue.lastName);
  //     setValue('email', initialValue.email);
  //     setValue('password', initialValue.password);
  //   }
  // }, []);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(employeeSchema)
  });

  console.log(initialValue);
  if (initialValue) {
    setValue('firstName', initialValue.firstName);
    setValue('lastName', initialValue.lastName);
    setValue('email', initialValue.email);
    setValue('password', initialValue.password);
  }

  const editEmployeeHandler = ({ firstName, lastName, email, password }, e) => {
    e.preventDefault();
    dispatch(
      editEmployee(
        initialValue,
        firstName,
        lastName,
        email,
        password,
        setEditItem,
        setIsEditModalOpen
      )
    );
  };

  const addEmployeeHandler = ({ firstName, lastName, email, password }, e) => {
    e.preventDefault();
    dispatch(addNewEmployee(firstName, lastName, email, password));
  };

  return (
    <section>
      <div className={styles.employeeForm}>
        <div className={styles.employeeTitle}>
          <h2>Employees</h2>
          <Button
            callback={() => {
              setIsAddModalOpen(true);
              setEditItem(null);
              setValue('firstName', '');
              setValue('lastName', '');
              setValue('email', '');
              setValue('password', '');
            }}
            icons={'add'}
          ></Button>
        </div>
        <Modal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen}>
          <div className={styles.container}>
            <div className={styles.title}>
              <h2>Add new Employee</h2>
            </div>
            <form className={styles.containerForm} onSubmit={handleSubmit(addEmployeeHandler)}>
              <div className={styles.formItem}>
                <InputControlled
                  label={'Name'}
                  type={'text'}
                  name={'firstName'}
                  placeholder="First name"
                  register={register}
                  required
                  error={errors.firstName}
                />
              </div>
              <div className={styles.formItem}>
                <InputControlled
                  label={'Name'}
                  type={'text'}
                  name={'lastName'}
                  placeholder="Last name"
                  register={register}
                  required
                  error={errors.lastName}
                />
              </div>
              <div className={styles.formItem}>
                <InputControlled
                  label={'Email'}
                  type={'email'}
                  name={'email'}
                  placeholder="Email"
                  register={register}
                  required
                  error={errors.email}
                />
              </div>
              <div className={styles.formItem}>
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
              <div className={styles.formItemSend}>
                <Button type="submit" value="Submit" icons={'submit'} />
              </div>
              <div className={styles.formItemSend}>
                <Button
                  text="Cancel"
                  callback={() => {
                    setIsAddModalOpen(false);
                  }}
                />
              </div>
            </form>
          </div>
        </Modal>
        <Modal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen}>
          <div className={styles.container}>
            <div className={styles.title}>
              <h2>Edit employee</h2>
            </div>
            <form className={styles.containerForm} onSubmit={handleSubmit(editEmployeeHandler)}>
              <div className={styles.formItem}>
                <InputControlled
                  label={'Name'}
                  type={'text'}
                  name={'firstName'}
                  placeholder="First name"
                  register={register}
                  required
                  error={errors.firstName}
                />
              </div>
              <div className={styles.formItem}>
                <InputControlled
                  label={'Name'}
                  type={'text'}
                  name={'lastName'}
                  placeholder="Last name"
                  register={register}
                  required
                  error={errors.lastName}
                />
              </div>
              <div className={styles.formItem}>
                <InputControlled
                  label={'Email'}
                  type={'email'}
                  name={'email'}
                  placeholder="Email"
                  register={register}
                  required
                  error={errors.email}
                />
              </div>
              <div className={styles.formItem}>
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
              <div className={styles.formItemSend}>
                <Button type="submit" value="Submit" icons={'submit'} />
              </div>
              <div className={styles.formItemSend}>
                <Button
                  text="Cancel"
                  callback={() => {
                    setIsEditModalOpen(false);
                  }}
                />
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </section>
  );
};
export default EmployeeForm;
