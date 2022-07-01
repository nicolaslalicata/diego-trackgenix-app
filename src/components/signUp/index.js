import styles from './signUp.module.css';
import Modal from 'components/shared/modal';
import Button from 'components/shared/buttons';
import { ButtonOption } from 'components/shared/buttonsOption';
import InputControlled from 'components/shared/inputControlled';
import Loader from 'components/shared/loading';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

function SignUp() {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).trim(),
    lastName: Joi.string().required().min(3).trim(),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .label('Passwords do not match')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

  return (
    <section className={styles.container}>
      <h2 className={styles.tittle}>Welcome to Trackgenix!</h2>
      <form onSubmit={handleSubmit()}>
        <div>
          <InputControlled
            type={'text'}
            label={'First Name'}
            name="firstName"
            register={register}
            required
            error={errors.firstName}
          />
        </div>
        <div>
          <InputControlled
            type={'text'}
            label={'Last Name'}
            name="lastName"
            register={register}
            required
            error={errors.lastName}
          />
        </div>
        <div>
          <InputControlled
            type={'text'}
            label={'Email'}
            name="email"
            register={register}
            required
            error={errors.email}
          />
        </div>
        <div>
          <InputControlled
            type={'password'}
            label={'Password'}
            name="password"
            register={register}
            required
            error={errors.password}
          />
        </div>
        <div>
          <InputControlled
            type={'password'}
            label={'Confirm Password'}
            name="confirmPassword"
            register={register}
            required
            error={errors.confirmPassword}
          />
        </div>
        <div className={styles.modalbuttons}>
          <ButtonOption option={'yes'} text={'Confirm'}></ButtonOption>
          <ButtonOption option={'no'} text={'Cancel'}></ButtonOption>
        </div>
      </form>
    </section>
  );
}

export default SignUp;
