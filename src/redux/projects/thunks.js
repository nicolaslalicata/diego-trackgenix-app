import { getProjectsSuccess, getProjectsPending, getProjectsError } from './actions';
// import { addProjectsSuccess, addProjectsPending, addProjectsError } from './actions';
// import { deleteProjectsSuccess, deleteProjectsPending, deleteProjectsError } from './actions';
// import { editProjectsSuccess, editProjectsPending, editProjectsError } from './actions';

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
