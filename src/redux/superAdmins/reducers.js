import {
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_ERROR,
  ADD_SUPERADMINS_SUCCESS,
  ADD_SUPERADMINS_PENDING,
  ADD_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_ERROR,
  EDIT_SUPERADMINS_SUCCESS,
  EDIT_SUPERADMINS_PENDING,
  EDIT_SUPERADMINS_ERROR
} from 'redux/superAdmins/constants';

const initialState = {
  List: [],
  error: '',
  isLoading: false
};
let updatedSA = [];

export const superAdminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        List: action.payload,
        isLoading: false,
        error: ''
      };
    case GET_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case GET_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case ADD_SUPERADMINS_SUCCESS:
      return {
        ...state,
        List: [...state.List, action.payload],
        isLoading: false,
        error: ''
      };
    case ADD_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case ADD_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case DELETE_SUPERADMINS_SUCCESS:
      return {
        ...state,
        List: state.List.filter((superAdm) => superAdm._id !== action.payload._id),
        isLoading: false,
        error: ''
      };
    case DELETE_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case DELETE_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case EDIT_SUPERADMINS_SUCCESS:
      updatedSA = state.List.map((superAdmin) => {
        if (superAdmin._id === action.payload._id) {
          return action.payload.superAdmin;
        } else {
          return superAdmin;
        }
      });
      return {
        ...state,
        List: updatedSA,
        isLoading: false,
        error: ''
      };
    case EDIT_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case EDIT_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
