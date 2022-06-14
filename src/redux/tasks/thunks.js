import { getTasksFulfilled } from './actions';

export const getTasks = () => {
  return (dispatch) => {
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getTasksFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getTasksFulfilled(error.toString()));
      });
  };
};
