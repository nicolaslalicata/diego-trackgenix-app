import { getProjectsSuccess, getProjectsPending, getProjectsError } from './actions';
import { addProjectsSuccess, addProjectsPending, addProjectsError } from './actions';
import { deleteProjectsSuccess, deleteProjectsPending, deleteProjectsError } from './actions';
import { editProjectsSuccess, editProjectsPending, editProjectsError } from './actions';

export const getProjects = () => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`)
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
  return async (dispatch) => {
    dispatch(addProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
      body: JSON.stringify(userInput),
      headers: {
        'Content-Type': 'application/json'
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
  // eslint-disable-next-line no-unused-vars
  const { _id, __v, ...other } = userInput;
  return async (dispatch) => {
    dispatch(editProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
      method: 'PUT',
      body: JSON.stringify(other),
      headers: {
        'Content-Type': 'application/json'
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
  const params = { method: 'delete' };
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
