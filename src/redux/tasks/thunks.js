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
} from 'redux/tasks/actions';

export const getTasks = () => {
  return (dispatch) => {
    dispatch(getTasksPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`, { headers: { token } })
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
  const token = sessionStorage.getItem('token');
  const url = `${process.env.REACT_APP_API_URL}/tasks/`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    body: JSON.stringify({
      employeeId: newTask.employeeId,
      projectId: newTask.projectId,
      description: newTask.description,
      workedHours: newTask.workedHours,
      date: newTask.date,
      done: newTask.done
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
  const token = sessionStorage.getItem('token');
  const url = `${process.env.REACT_APP_API_URL}/tasks/${taskEdited.id}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    body: JSON.stringify({
      employeeId: taskEdited.employeeId,
      projectId: taskEdited.projectId,
      description: taskEdited.description,
      workedHours: taskEdited.workedHours,
      date: taskEdited.date,
      done: taskEdited.done
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
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(deleteTasksPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: { token }
    })
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
