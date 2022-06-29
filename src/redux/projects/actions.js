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

export const getProjectsSuccess = (projects) => ({
  type: GET_PROJECTS_SUCCESS,
  payload: projects
});
export const getProjectsPending = () => ({
  type: GET_PROJECTS_PENDING
});
export const getProjectsError = (error) => ({
  type: GET_PROJECTS_ERROR,
  payload: error
});

export const addProjectsSuccess = (projects) => ({
  type: ADD_PROJECTS_SUCCESS,
  payload: projects
});
export const addProjectsPending = () => ({
  type: ADD_PROJECTS_PENDING
});
export const addProjectsError = (error) => ({
  type: ADD_PROJECTS_ERROR,
  payload: error
});

export const deleteProjectsSuccess = (projects) => ({
  type: DELETE_PROJECTS_SUCCESS,
  payload: projects
});
export const deleteProjectsPending = () => ({
  type: DELETE_PROJECTS_PENDING
});
export const deleteProjectsError = (error) => ({
  type: DELETE_PROJECTS_ERROR,
  payload: error
});

export const editProjectsSuccess = (projects) => ({
  type: EDIT_PROJECTS_SUCCESS,
  payload: projects
});
export const editProjectsPending = () => ({
  type: EDIT_PROJECTS_PENDING
});
export const editProjectsError = (error) => ({
  type: EDIT_PROJECTS_ERROR,
  payload: error
});
