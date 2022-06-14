import {
  GET_PROJECTS_SUCCESS,
  ADD_PROJECTS_SUCCESS,
  DELETE_PROJECTS_SUCCESS,
  EDIT_PROJECTS_SUCCESS,
  GET_PROJECTS_PENDING,
  GET_PROJECTS_ERROR
} from './constants';

const initialState = {
  projectsList: [],
  error: '',
  loading: false
};
let updatedSA = [];
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
    case DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        projectsList: state.projectsList.filter((e) => e._id !== action.payload)
      };
    case EDIT_PROJECTS_SUCCESS:
      updatedSA = state.list.map((item) => {
        if (item._id === action.payload._id) {
          return;
        } else {
          return item;
        }
      });
      return {
        ...state,
        projectsList: updatedSA
      };
    default:
      return state;
  }
};
