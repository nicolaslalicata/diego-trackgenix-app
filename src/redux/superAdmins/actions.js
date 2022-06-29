import {
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_ERROR,
  ADD_SUPERADMINS_SUCCESS,
  ADD_SUPERADMINS_PENDING,
  ADD_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_ERROR,
  EDIT_SUPERADMINS_SUCCESS,
  EDIT_SUPERADMINS_PENDING,
  EDIT_SUPERADMINS_ERROR
} from 'redux/superAdmins/constants';

export const getSuperAdminsSuccess = (superAdmins) => ({
  type: GET_SUPERADMINS_SUCCESS,
  payload: superAdmins
});
export const getSuperAdminsPending = () => ({
  type: GET_SUPERADMINS_PENDING
});
export const getSuperAdminsError = (error) => ({
  type: GET_SUPERADMINS_ERROR,
  payload: error
});

export const addSuperAdminsSuccess = (superAdmin) => ({
  type: ADD_SUPERADMINS_SUCCESS,
  payload: superAdmin
});
export const addSuperAdminsPending = () => ({
  type: ADD_SUPERADMINS_PENDING
});
export const addSuperAdminsError = (error) => ({
  type: ADD_SUPERADMINS_ERROR,
  payload: error
});

export const deleteSuperAdminsSuccess = (superAdmin) => ({
  type: DELETE_SUPERADMINS_SUCCESS,
  payload: superAdmin
});
export const deleteSuperAdminsPending = () => ({
  type: DELETE_SUPERADMINS_PENDING
});
export const deleteSuperAdminsError = (error) => ({
  type: DELETE_SUPERADMINS_ERROR,
  payload: error
});

export const editSuperAdminsSuccess = (superAdmin, _id) => ({
  type: EDIT_SUPERADMINS_SUCCESS,
  payload: { superAdmin, _id }
});
export const editSuperAdminsPending = () => ({
  type: EDIT_SUPERADMINS_PENDING
});
export const editSuperAdminsError = (error) => ({
  type: EDIT_SUPERADMINS_ERROR,
  payload: error
});
