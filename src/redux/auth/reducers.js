import {
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_AUTHENTICATION
} from 'redux/auth/constants';

// this state is being used in the header component
const initialState = {
  isLoading: false,
  user: {
    localId: sessionStorage.getItem('localId'),
    displayName: sessionStorage.getItem('displayName'),
    role: sessionStorage.getItem('role'),
    authenticated: false
  },
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
        authenticated: true,
        error: action.payload
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
    case SET_AUTHENTICATION: {
      return {
        ...state,
        user: action.payload,
        isFetching: false
      };
    }
    default:
      return state;
  }
};
