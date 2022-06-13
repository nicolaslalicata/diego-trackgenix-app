import { GET_TASKS_FULFILLED } from './constants';

export const getTasksFulfilled = (tasks) => ({
  type: GET_TASKS_FULFILLED,
  payload: tasks
});
