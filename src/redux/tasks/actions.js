import { GET_TASKS_FULFILLED } from './constants';
import { ADD_TASK_FULFILLED } from './constants';
import { DELETE_TASK_FULFILLED } from './constants';

export const getTasksFulfilled = (tasks) => ({
  type: GET_TASKS_FULFILLED,
  payload: tasks
});

export const addTaskFullfilled = (task) => ({
  type: ADD_TASK_FULFILLED,
  payload: task
});

export const deleteTaskFullfilled = (taskId) => ({
  type: DELETE_TASK_FULFILLED,
  payload: taskId
});
