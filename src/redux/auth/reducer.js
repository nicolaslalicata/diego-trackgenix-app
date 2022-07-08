import {
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAN_ERROR
} from 'redux/auth/constants';

const initialState = {
  isLoading: false,
  authenticated: false,
  error: ''
};

export const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_PENDING:
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: true
      };
    case REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
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
    case CLEAN_ERROR:
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };

    default:
      return state;
  }
};
