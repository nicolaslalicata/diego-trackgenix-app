import {
  GET_EMPLOYEES_SUCCESS,
  ADD_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_SUCCESS,
  EDIT_EMPLOYEES_SUCCESS,
  EMPLOYEES_PENDING,
  EMPLOYEES_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from 'redux/employees/constants';

export const getEmployeesSuccess = (employees) => ({
  type: GET_EMPLOYEES_SUCCESS,
  payload: employees
});
export const employeesPending = () => ({
  type: EMPLOYEES_PENDING
});
export const employeesError = (error) => ({
  type: EMPLOYEES_ERROR,
  payload: error
});

export const addEmployeesSuccess = (employees) => ({
  type: ADD_EMPLOYEES_SUCCESS,
  payload: employees
});

export const deleteEmployeesSuccess = (employees) => ({
  type: DELETE_EMPLOYEES_SUCCESS,
  payload: employees
});

export const editEmployeesSuccess = (employees) => ({
  type: EDIT_EMPLOYEES_SUCCESS,
  payload: employees
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

export const logoutPending = () => {
  return {
    type: LOGOUT_PENDING
  };
};

export const logoutSuccess = (data) => ({
  type: LOGOUT_SUCCESS,
  payload: data
});

export const logoutError = (error) => ({
  type: LOGOUT_ERROR,
  payload: error
});
