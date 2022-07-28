import styles from 'components/login/logIn.module.css';
import { ButtonOption } from 'components/shared/buttonsOption';
import InputControlled from 'components/shared/inputControlled';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Modal from 'components/shared/modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from 'components/home';
import { login } from 'redux/auth/thunks';
// import Routes from 'components/routes';
import { Route } from 'react-router-dom';
// actions

function Login() {
  const dispatch = useDispatch();

  const userLoggedIn = useSelector((state) => state.userLogged.authenticated);

  const [showModalMessage, setShowModalMessage] = useState(false, { message: '' });

  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8)
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

  const loginForm = ({ email, password }) => {
    dispatch(login(email, password)).then((response) => {
      const res = response.toString();
      if (res.includes('Error')) {
        setShowModalMessage({
          showModalMessage: true,
          title: 'Message',
          message: 'invalid email or password'
        });
      }
    });
  };

  return userLoggedIn ? (
    <Home />
  ) : (
    <section className={styles.container}>
      <h2 className={styles.tittle}>Log In!</h2>
      <form onSubmit={handleSubmit(loginForm)}>
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
        <div className={styles.modalbuttons}>
          <ButtonOption option={'yes'} text={'Confirm'}></ButtonOption>
          <ButtonOption option={'no'} text={'Cancel'}></ButtonOption>
        </div>
      </form>
      <h3>
        Not a member? <a href="https://diego-trackgenix-app.vercel.app/sign-up">signup!</a>
      </h3>
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

export default Login;
