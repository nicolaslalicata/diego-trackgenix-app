import { GET_ADMINS_FULFILLED, ADD_ADMIN_FULFILLED } from './constants';

export const getAdminsFulfilled = (admins) => ({
  type: GET_ADMINS_FULFILLED,
  payload: admins
});

export const addAdminFulfilled = (admins) => ({
  type: ADD_ADMIN_FULFILLED,
  payload: admins
});
