import { getProjectsSuccess, getProjectsPending, getProjectsError } from 'redux/projects/actions';
import { addProjectsSuccess, addProjectsPending, addProjectsError } from 'redux/projects/actions';
import {
  deleteProjectsSuccess,
  deleteProjectsPending,
  deleteProjectsError
} from 'redux/projects/actions';
import {
  editProjectsSuccess,
  editProjectsPending,
  editProjectsError
} from 'redux/projects/actions';

export const getProjects = () => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    dispatch(getProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getProjectsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getProjectsError(error.toString()));
      });
  };
};

export const addProject = (userInput, setModalNotification) => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    dispatch(addProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
      body: JSON.stringify(userInput),
      headers: {
        'Content-Type': 'application/json',
        token
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(addProjectsSuccess(response.data));
          setModalNotification({
            modalNotification: true,
            title: 'Add Project Successfully'
          });
        } else {
          dispatch(addProjectsError(response.error.toString()));
          setModalNotification({
            modalNotification: true,
            title: 'Error in Add Project'
          });
        }
      });
  };
};

export const editProject = (userInput, setModalNotification) => {
  const token = sessionStorage.getItem('token');
  const { _id, ...other } = userInput;
  return async (dispatch) => {
    dispatch(editProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
      method: 'PUT',
      body: JSON.stringify(other),
      headers: {
        'Content-Type': 'application/json',
        token
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(editProjectsSuccess(response.data));
          setModalNotification({
            modalNotification: true,
            title: 'Edit Project Successfully'
          });
        } else {
          dispatch(editProjectsError(response.error.toString()));
          setModalNotification({
            modalNotification: true,
            title: 'Error in Edit Project'
          });
        }
      });
  };
};

export const deleteProject = (userInput, setModalNotification) => {
  const token = sessionStorage.getItem('token');
  const params = { method: 'DELETE', headers: { token } };
  const id = userInput._id;
  return async (dispatch) => {
    dispatch(deleteProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, params)
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(deleteProjectsSuccess(response.data));
          setModalNotification({
            modalNotification: true,
            title: 'Delete Project Successfully'
          });
        } else {
          dispatch(deleteProjectsError(response.error.toString()));
          setModalNotification({
            modalNotification: true,
            title: 'Error in Delete Project'
          });
        }
      });
  };
};
