import {
  GET_ADMINS_SUCCESS,
  ADD_ADMIN_SUCCESS,
  GET_ADMINS_PENDING,
  GET_ADMINS_ERROR,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_ERROR,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_ERROR,
  EDIT_ADMIN_SUCCESS,
  EDIT_ADMIN_PENDING,
  EDIT_ADMIN_ERROR
} from 'redux/admins/constants';

export const getAdminsSuccess = (admins) => ({
  type: GET_ADMINS_SUCCESS,
  payload: admins
});

export const getAdminsPending = () => ({
  type: GET_ADMINS_PENDING
});

export const getAdminsError = (error) => ({
  type: GET_ADMINS_ERROR,
  payload: error
});

export const addAdminSuccess = (admins) => ({
  type: ADD_ADMIN_SUCCESS,
  payload: admins
});

export const addAdminPending = () => ({
  type: ADD_ADMIN_PENDING
});

export const addAdminError = (error) => ({
  type: ADD_ADMIN_ERROR,
  payload: error
});

export const editAdminSuccess = (admins) => ({
  type: EDIT_ADMIN_SUCCESS,
  payload: admins
});

export const editAdminPending = () => ({
  type: EDIT_ADMIN_PENDING
});

export const editAdminError = (error) => ({
  type: EDIT_ADMIN_ERROR,
  payload: error
});

export const deleteAdminSuccess = (admins) => ({
  type: DELETE_ADMIN_SUCCESS,
  payload: admins
});

export const deleteAdminPending = () => ({
  type: DELETE_ADMIN_PENDING
});

export const deleteAdminError = (error) => ({
  type: DELETE_ADMIN_ERROR,
  payload: error
});
