import {
  GET_EMPLOYEES_SUCCESS,
  EMPLOYEES_PENDING,
  EMPLOYEES_ERROR,
  ADD_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_SUCCESS,
  EDIT_EMPLOYEES_SUCCESS
} from './constants';

const initialState = {
  employeesList: [],
  isLoading: false,
  error: ''
};
export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeesList: action.payload,
        isLoading: false
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
        isLoading: false
      };
    case ADD_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeesList: [...state.employeesList, action.payload],
        isLoading: false
      };

    case DELETE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeesList: state.employeesList.filter((e) => e._id !== action.payload._id),
        isLoading: false
      };

    case EDIT_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeesList: state.employeesList.map((element) =>
          element._id === action.payload._id ? action.payload : element
        ),
        isLoading: false
      };

    default:
      return state;
  }
};
