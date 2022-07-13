import {
  GET_ADMINS_SUCCESS,
  GET_ADMINS_PENDING,
  ADD_ADMIN_SUCCESS,
  GET_ADMINS_ERROR,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_ERROR,
  EDIT_ADMIN_SUCCESS,
  EDIT_ADMIN_PENDING,
  EDIT_ADMIN_ERROR,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_ERROR
} from 'redux/admins/constants';
const initialState = {
  action: [],
  isLoading: false,
  error: '',
  list: []
};

export const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: ''
      };
    case GET_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: ''
      };
    case ADD_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case ADD_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case EDIT_ADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.map((element) =>
          element._id === action.payload._id ? action.payload : element
        ),
        isLoading: false,
        error: ''
      };
    case EDIT_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case EDIT_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.filter((e) => e._id !== action.payload._id),
        isLoading: false,
        error: ''
      };
    case DELETE_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case DELETE_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
