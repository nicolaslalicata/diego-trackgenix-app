import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_PENDING,
  GET_PROJECTS_ERROR,
  ADD_PROJECTS_SUCCESS,
  ADD_PROJECTS_PENDING,
  ADD_PROJECTS_ERROR,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_ERROR,
  EDIT_PROJECTS_SUCCESS,
  EDIT_PROJECTS_PENDING,
  EDIT_PROJECTS_ERROR
} from 'redux/projects/constants';

const initialState = {
  projectsList: [],
  error: '',
  loading: false
};
let updatedP = [];
export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projectsList: action.payload,
        loading: false
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        loading: true
      };
    case ADD_PROJECTS_SUCCESS:
      return {
        ...state,
        projectsList: [...state.projectsList, action.payload]
      };
    case ADD_PROJECTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case ADD_PROJECTS_PENDING:
      return {
        ...state,
        loading: true
      };
    case DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        projectsList: state.projectsList.filter((e) => e._id !== action.payload)
      };
    case DELETE_PROJECTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case DELETE_PROJECTS_PENDING:
      return {
        ...state,
        loading: true
      };
    case EDIT_PROJECTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case EDIT_PROJECTS_PENDING:
      return {
        ...state,
        loading: true
      };
    case EDIT_PROJECTS_SUCCESS:
      updatedP = state.projectsList.map((item) => {
        if (item._id === action.payload._id) {
          return;
        } else {
          return item;
        }
      });
      return {
        ...state,
        projectsList: updatedP
      };
    default:
      return state;
  }
};
