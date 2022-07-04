import { loginPending, loginSuccess, loginError } from './actions';

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    };
    return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, options)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        sessionStorage.setItem('token', response.data.token);
        dispatch(loginSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        return dispatch(loginError(error.toString()));
      });
  };
};
export const logout = (email, password) => {
  return (dispatch) => {
    dispatch(loginPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    };
    return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, options)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        sessionStorage.setItem('token', response.data.token);
        dispatch(loginSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        return dispatch(loginError(error.toString()));
      });
  };
};

export const signup = (email, password) => {
  return (dispatch) => {
    dispatch(loginPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
        sessionStorage.setItem('token', response.data.token);
        dispatch(loginSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        return dispatch(loginError(error.toString()));
      });
  };
};
