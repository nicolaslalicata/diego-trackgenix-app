import { registerPending, registerSuccess, registerError } from './actions';
import { loginPending, loginSuccess, loginError } from './actions';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const registerUser = (firstName, lastName, email, password) => {
  return (dispatch) => {
    dispatch(registerPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    };
    return fetch(`${process.env.REACT_APP_API_URL}/auth/register`, options)
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(registerSuccess(response));
        return response;
      })
      .catch((error) => {
        return dispatch(registerError(error.toString()));
      });
  };
};

export const login = (email, password) => {
  const auth = getAuth();
  return (dispatch) => {
    dispatch(loginPending());
    signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        const {
          claims: { role }
        } = await response.user.getIdTokenResult();
        console.log('role', role);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', email);
      })
      .then((response) => {
        dispatch(loginSuccess(response));
        return response;
      })
      .catch((error) => {
        dispatch(loginError(error));
        return dispatch(registerError(error.toString()));
      });
  };
};
