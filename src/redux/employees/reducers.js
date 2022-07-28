import {
  GET_EMPLOYEES_SUCCESS,
  EMPLOYEES_PENDING,
  EMPLOYEES_ERROR,
  ADD_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_SUCCESS,
  EDIT_EMPLOYEES_SUCCESS,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from 'redux/employees/constants';

const initialState = {
  employeesList: [],
  isLoading: false,
  error: '',
  successMessage: false
};
export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeesList: action.payload,
        isLoading: false,
        successMessage: false
      };
    case EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EMPLOYEES_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        successMessage: ''
      };
    case ADD_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeesList: [...state.employeesList, action.payload],
        isLoading: false,
        error: false,
        successMessage: 'Employee added'
      };

    case DELETE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeesList: state.employeesList.filter((e) => e._id !== action.payload._id),
        isLoading: false,
        error: false,
        successMessage: 'Employee deleted'
      };

    case EDIT_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeesList: state.employeesList.map((element) =>
          element._id === action.payload._id ? action.payload : element
        ),
        isLoading: false,
        error: false,
        successMessage: 'Employee edited'
      };
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: true
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: true
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
