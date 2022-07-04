import styles from 'components/login/logIn.module.css';
import { login } from 'redux/employees/thunks';
import { setUser } from 'redux/user/thunks';
import { ButtonOption } from 'components/shared/buttonsOption';
import InputControlled from 'components/shared/inputControlled';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Modal from 'components/shared/modal';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
// actions

function loginUser() {
  const [showModalMessage, setShowModalMessage] = useState(false, { message: '' });
  const history = useHistory();

  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8)
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

  const loginUser = ({ email, password }, e) => {
    e.preventDefault();
    dispatch(login(email, password)).then((response) => {
      setShowModalMessage({
        showModalMessage: true,
        title: 'Message',
        message: 'Invalid credentials'
      });
      if (response?._id) {
        dispatch(setUser(response.email));
        history.push('/');
      }
    });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.tittle}>Log In!</h2>
      <form onSubmit={handleSubmit(loginUser)}>
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
        Not a member? <a href="http:/sign-up">signup!</a>
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

export default loginUser;
