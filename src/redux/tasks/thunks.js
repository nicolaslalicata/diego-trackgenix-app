import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  addTaskPending,
  addTaskSuccess,
  addTaskError,
  editTasksPending,
  editTasksSuccess,
  editTasksError,
  deleteTasksPending,
  deleteTasksSuccess,
  deleteTasksError
} from './actions';

export const getTasks = () => {
  return (dispatch) => {
    dispatch(getTasksPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getTasksSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getTasksError(error.toString()));
      });
  };
};

export const addTaskThunks = (newTask) => {
  const url = `${process.env.REACT_APP_API_URL}/tasks/`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: newTask.description,
      workedHours: newTask.workedHours,
      date: newTask.date
    })
  };
  return (dispatch) => {
    dispatch(addTaskPending());
    return fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        dispatch(addTaskSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(addTaskError(error));
      });
  };
};
export const editTaskThunks = (taskEdited) => {
  const url = `${process.env.REACT_APP_API_URL}/tasks/${taskEdited.id}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: taskEdited.description,
      workedHours: taskEdited.workedHours,
      date: taskEdited.date
    })
  };
  return (dispatch) => {
    dispatch(editTasksPending());
    return fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        dispatch(editTasksSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(editTasksError(error));
      });
  };
};

export const deleteTaskThunks = (id) => {
  return (dispatch) => {
    dispatch(deleteTasksPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteTasksSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(deleteTasksError(error.toString()));
      });
  };
};
