import styles from './signUp.module.css';
import { ButtonOption } from 'components/shared/buttonsOption';
import InputControlled from 'components/shared/inputControlled';
import { registerUser } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Modal from 'components/shared/modal';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
const provider = new GoogleAuthProvider();
import { getAuth, signInWithPopup } from 'firebase/auth';

function Signup() {
  const [showModalMessage, setShowModalMessage] = useState(false, { message: '', error: false });
  const history = useHistory();
  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    firstName: Joi.string().required().min(3).max(20),
    lastName: Joi.string().required().min(3).max(20),
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

  const SignUpWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user.email);
        const firstName = user.displayName.split(' ')[0];
        const lastName = user.displayName.split(' ')[1];
        const email = user.email;
        const uid = user.uid;
        console.log(uid);
        const password = '123456';
        // ...
        setShowModalMessage({
          error: true,
          showModalMessage: true,
          title: 'Message',
          message: 'Logged in with Google'
        });
        history.push('/');
        //Register user with firebase
        try {
          dispatch(registerUser(uid, firstName, lastName, email, password)).then((response) => {
            if (response.type === 'REGISTER_ERROR') {
              setShowModalMessage({
                error: true,
                showModalMessage: true,
                title: 'Message',
                message: response.payload
              });
            }
            if (response.error === false) {
              setShowModalMessage({
                error: false,
                showModalMessage: true,
                title: 'Success',
                message: response.message
              });
            }
          });
        } catch (error) {
          setShowModalMessage({
            showModalMessage: true,
            title: error.code,
            message: error.data.message
          });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setShowModalMessage({
          showModalMessage: true,
          title: errorCode,
          message: errorMessage
        });
      });
  };

  const signupUser = ({ firstName, lastName, email, password }, e) => {
    e.preventDefault();
    try {
      dispatch(registerUser(firstName, lastName, email, password)).then((response) => {
        if (response.type === 'REGISTER_ERROR') {
          setShowModalMessage({
            error: true,
            showModalMessage: true,
            title: 'Message',
            message: response.payload
          });
        }
        if (response.error === false) {
          setShowModalMessage({
            error: false,
            showModalMessage: true,
            title: 'Success',
            message: response.message
          });
        }
      });
    } catch (error) {
      setShowModalMessage({
        showModalMessage: true,
        title: error.code,
        message: error.data.message
      });
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.tittle}>Welcome to Trackgenix!</h2>
      <form onSubmit={handleSubmit(signupUser)}>
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
      <Modal
        isOpen={showModalMessage}
        setIsOpen={setShowModalMessage}
        title={showModalMessage.title}
        reset={
          showModalMessage.error
            ? reset
            : () => {
                history.push('/auth/login');
              }
        }
      >
        <div className={styles.modalMessage}>{showModalMessage.message}</div>
      </Modal>
      <button onClick={SignUpWithGoogle}>Google</button>
    </section>
  );
}

export default Signup;
