import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAN_ERROR,
  SET_AUTHENTICATION
} from 'redux/auth/constants';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error
});
export const cleanError = () => ({
  type: CLEAN_ERROR
});
export const setAuthentication = () => ({
  type: SET_AUTHENTICATION
});
