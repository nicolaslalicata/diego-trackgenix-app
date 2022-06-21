import {
  GET_EMPLOYEES_SUCCESS,
  ADD_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_SUCCESS,
  EDIT_EMPLOYEES_SUCCESS,
  EMPLOYEES_PENDING,
  EMPLOYEES_ERROR
} from './constants';

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
