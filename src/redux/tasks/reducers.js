import {
  GET_TASKS_FULFILLED,
  ADD_TASK_FULFILLED,
  DELETE_TASK_FULFILLED,
  EDIT_TASK_FULFILLED
} from './constants';

const initialState = {
  tasksList: []
};
let updatedTask = [];
export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_FULFILLED:
      return {
        ...state,
        tasksList: action.payload
      };
    case ADD_TASK_FULFILLED:
      return {
        ...state,
        tasksList: [...state.tasksList, action.payload]
      };
    case DELETE_TASK_FULFILLED:
      return {
        ...state,
        tasksList: state.tasksList.filter((task) => task._id !== action.payload)
      };
    case EDIT_TASK_FULFILLED:
      updatedTask = state.list.map((task) => {
        if (task._id === action.payload._id) {
          return;
        } else {
          return task;
        }
      });
      return {
        ...state,
        taskList: updatedTask
      };

    default:
      return state;
  }
};
