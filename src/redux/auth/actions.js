import {
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAN_ERROR
} from 'redux/auth/constants';

export const registerPending = () => {
  return {
    type: REGISTER_PENDING
  };
};
export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data
});
export const registerError = (error) => ({
  type: REGISTER_ERROR,
  payload: error
});
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
