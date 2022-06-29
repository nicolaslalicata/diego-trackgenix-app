import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  ADD_TASK_PENDING,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  EDIT_TASK_PENDING,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR
} from 'redux/tasks/constants';

export const getTasksPending = () => {
  return {
    type: GET_TASKS_PENDING
  };
};

export const getTasksSuccess = (tasks) => ({
  type: GET_TASKS_SUCCESS,
  payload: tasks
});

export const getTasksError = (error) => ({
  type: GET_TASKS_ERROR,
  payload: error
});

export const addTaskPending = () => {
  return {
    type: ADD_TASK_PENDING
  };
};

export const addTaskSuccess = (task) => ({
  type: ADD_TASK_SUCCESS,
  payload: task
});

export const addTaskError = (error) => ({
  type: ADD_TASK_ERROR,
  payload: error
});

export const deleteTasksPending = () => {
  return {
    type: DELETE_TASK_PENDING
  };
};

export const deleteTasksSuccess = (tasks) => ({
  type: DELETE_TASK_SUCCESS,
  payload: tasks
});

export const deleteTasksError = (error) => ({
  type: DELETE_TASK_ERROR,
  payload: error
});

export const editTasksPending = () => ({
  type: EDIT_TASK_PENDING
});

export const editTasksSuccess = (tasks) => ({
  type: EDIT_TASK_SUCCESS,
  payload: tasks
});

export const editTasksError = (error) => ({
  type: EDIT_TASK_ERROR,
  payload: error
});
