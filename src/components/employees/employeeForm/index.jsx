import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import Button from 'components/shared/buttons';
import Modal from 'components/shared/modal';
import InputControlled from 'components/shared/inputControlled';
import DropdownForm from 'components/shared/dropdown';
import { ButtonOption } from 'components/shared/buttonsOption';
import { addNewEmployee } from 'redux/employees/thunks';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux/es/exports';

const EmployeeForm = ({
  editEmployee,
  initialValue,
  isEditModalOpen,
  setIsEditModalOpen,
  setEditItem,
  dispatch
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const error = useSelector((state) => state.employees.error);
  const successMessage = useSelector((state) => state.employees.successMessage);

  const employeeSchema = Joi.object({
    firstName: Joi.string()
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
    phone: Joi.number()
      .integer()
      .min(10 ** 9)
      .max(10 ** 10 - 1)
      .required()
      .messages({
        'number.min': 'Invalid phone number',
        'number.max': 'Invalid phone number'
      }),
    password: Joi.string()
      .required()
      .min(8)
      .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
      .messages({
        'string.pattern.base': 'The password must have letters and numbers'
      }),
    active: Joi.boolean()
  });

  useEffect(() => {
    reset({
      firstName: initialValue.firstName,
      lastName: initialValue.lastName,
      email: initialValue.email,
      phone: initialValue.phone,
      password: initialValue.password,
      active: initialValue.active
    });
  }, [initialValue]);

  useEffect(() => {
    if (error === false && successMessage) {
      return setIsModalSuccess(true);
    }
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(employeeSchema)
  });

  useEffect(() => {
    reset();
  }, []);

  const editEmployeeHandler = ({ firstName, lastName, email, phone, password, active }, e) => {
    const uid = initialValue.firebaseUid;
    e.preventDefault();
    dispatch(
      editEmployee(
        initialValue,
        firstName,
        lastName,
        email,
        phone,
        password,
        active,
        uid,
        setEditItem,
        setIsEditModalOpen
      )
    );
    setIsEditModalOpen(false);
  };

  const addEmployeeHandler = ({ firstName, lastName, email, phone, password, active }, e) => {
    e.preventDefault();
    dispatch(addNewEmployee(firstName, lastName, email, phone, password, active));
  };

  return (
    <section>
      <div className={styles.employeeForm}>
        <div className={styles.employeeTitle}>
          <Button
            callback={() => {
              setIsAddModalOpen(true);
              reset({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                active: ''
              });
            }}
            icons={'add'}
          ></Button>
        </div>
        <Modal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          title={'Add new Employee'}
          reset={reset}
        >
          <div className={styles.container}>
            <form className={styles.containerForm} onSubmit={handleSubmit(addEmployeeHandler)}>
              <div>
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
                    label={'Last Name'}
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
                    name={'email'}
                    placeholder="Email"
                    register={register}
                    required
                    error={errors.email}
                  />
                </div>
              </div>
              <div>
                <div className={styles.formItem}>
                  <InputControlled
                    label={'Phone'}
                    type={'phone'}
                    name={'phone'}
                    placeholder="Phone"
                    register={register}
                    required
                    error={errors.phone}
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
                <DropdownForm
                  initialOption="Is Active?"
                  label="Active"
                  options={['true', 'false']}
                  name="active"
                  register={register}
                  required
                  error={errors.active}
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
        <Modal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          title={'Edit employee'}
          reset={reset}
        >
          <div className={styles.container}>
            <form className={styles.containerForm} onSubmit={handleSubmit(editEmployeeHandler)}>
              <div>
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
                    label={'Last Name'}
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
                    name={'email'}
                    placeholder="Email"
                    register={register}
                    required
                    error={errors.email}
                  />
                </div>
              </div>
              <div>
                <div className={styles.formItem}>
                  <InputControlled
                    label={'Phone'}
                    type={'phone'}
                    name={'phone'}
                    placeholder="Phone"
                    register={register}
                    required
                    error={errors.phone}
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
                <DropdownForm
                  // initialOption="Is Active?"
                  label="Active"
                  options={['true', 'false']}
                  name="active"
                  register={register}
                  error={errors.active}
                />
              </div>
              <div className={styles.formItemSend}>
                <ButtonOption option={'yes'} text={'Confirm'}></ButtonOption>
                <ButtonOption
                  option={'no'}
                  text="Cancel"
                  callback={() => {
                    setIsEditModalOpen(false);
                  }}
                ></ButtonOption>
              </div>
            </form>
          </div>
        </Modal>
        <Modal
          isOpen={isModalSuccess}
          setIsOpen={setIsModalSuccess}
          reset={reset}
          title={'Message'}
        >
          <h3>{successMessage}</h3>
        </Modal>
      </div>
    </section>
  );
};
export default EmployeeForm;
