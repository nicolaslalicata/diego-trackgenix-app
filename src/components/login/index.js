import styles from 'components/login/logIn.module.css';
import { ButtonOption } from 'components/shared/buttonsOption';
import InputControlled from 'components/shared/inputControlled';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Modal from 'components/shared/modal';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// actions

function Loginuser() {
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

  const login = ({ email, password }, e) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          setShowModalMessage({
            showModalMessage: true,
            title: 'Message',
            message: 'Login Successful'
          });
        }
      })
      .catch((error) => {
        setShowModalMessage({
          showModalMessage: true,
          title: error.code,
          message: error.message
        });
      });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.tittle}>Log In!</h2>
      <form onSubmit={handleSubmit(login)}>
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
        Not a member? <a href="http:/auth/register">signup!</a>
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

export default Loginuser;
