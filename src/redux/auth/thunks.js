import {
  registerPending,
  registerSuccess,
  registerError,
  loginPending,
  loginSuccess,
  loginError,
  setAuthentication
} from './actions';

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
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        if (response.user) {
          const user = await response.user.getIdToken();
          dispatch(loginSuccess(user));
        }
        const localId = await response.user.auth.currentUser.reloadUserInfo.localId;
        const token = await response.user.getIdToken();
        const displayName = await response.user.displayName;
        const {
          claims: { role }
        } = await response.user.getIdTokenResult();
        sessionStorage.setItem('localId', localId);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('displayName', displayName);
        dispatch(setAuthentication({ authenticated: true, displayName, role, localId }));
        return response;
      })
      .then((response) => {
        dispatch(loginSuccess(response));
        return response.json();
      })
      .catch((error) => {
        dispatch(loginError(error));
        return error;
      });
  };
};

export const setUser = (userLogged) => {
  return (dispatch) => {
    dispatch(setAuthentication(userLogged));
  };
};
