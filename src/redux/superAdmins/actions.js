import { GET_SUPERADMINS_FULFILLED, ADD_SUPERADMINS_FULFILLED } from './constants';

export const getSuperAdminsFulfilled = (superAdmins) => ({
  type: GET_SUPERADMINS_FULFILLED,
  payload: superAdmins
});

export const addSuperAdminsFulfilled = (superAdmin) => ({
  type: ADD_SUPERADMINS_FULFILLED,
  payload: superAdmin
});
