import {
  SET_USER,
  GET_EMPLOYEE_PENDING,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_ERROR
} from './constants';

const default_user = { user: '', authenticated: false };

export const user_reducer = (state = default_user, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
        authenticated: action.authenticated
      };
    }
    case GET_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        tasksList: action.payload,
        isLoading: false
      };
    case GET_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
