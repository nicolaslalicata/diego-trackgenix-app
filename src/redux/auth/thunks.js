import { registerPending, registerSuccess, registerError } from './actions';

export const registerUser = (firebaseUid, firstName, lastName, email, password) => {
  return (dispatch) => {
    dispatch(registerPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firebaseUid,
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
