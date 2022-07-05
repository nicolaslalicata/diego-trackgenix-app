import styles from './signup.module.css';
import { ButtonOption } from 'components/shared/buttonsOption';
import InputControlled from 'components/shared/inputControlled';
import { signup } from 'redux/employees/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Modal from 'components/shared/modal';
import { useState } from 'react';

function SignupUser() {
  const [showModalMessage, setShowModalMessage] = useState(false, { message: '' });
  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .label('Passwords do not match')
  });

  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

  const signupUser = ({ email, password }, e) => {
    e.preventDefault();
    dispatch(signup(email, password)).then((response) => {
      setShowModalMessage({
        showModalMessage: true,
        title: 'Message',
        message: response.message
      });
      if (response?._id) {
        setShowModalMessage({
          showModalMessage: true,
          title: 'Message',
          message: 'Please, login!'
        });
      }
    });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.tittle}>Welcome to Trackgenix!</h2>
      <form onSubmit={handleSubmit(signupUser)}>
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
      <Modal
        isOpen={showModalMessage}
        setIsOpen={setShowModalMessage}
        title={showModalMessage.title}
        reset={reset}
      >
        <div className={styles.modalMessage}>{showModalMessage.message}</div>
      </Modal>
    </section>
  );
}

export default SignupUser;
