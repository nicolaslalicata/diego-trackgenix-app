import {
  SET_USER,
  GET_EMPLOYEE_PENDING,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_ERROR
} from './constants';

export const set_user = (user, authenticated) => {
  return {
    type: SET_USER,
    payload: user,
    authenticated
  };
};

export const getEmployeepending = () => {
  return {
    type: GET_EMPLOYEE_PENDING
  };
};

export const getEmployeeSuccess = (tasks) => ({
  type: GET_EMPLOYEE_SUCCESS,
  payload: tasks
});

export const getEmployeeError = (error) => ({
  type: GET_EMPLOYEE_ERROR,
  payload: error
});
