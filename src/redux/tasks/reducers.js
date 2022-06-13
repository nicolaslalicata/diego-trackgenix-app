import {
  GET_TASKS_FULFILLED,
  ADD_TASK_FULFILLED,
  DELETE_TASK_FULFILLED,
  EDIT_TASK_FULFILLED
} from './constants';

const initialState = {
  tasksList: []
};

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
      return {
        ...state,
        tasksList: state.tasksList.map((task) => {
          task._id !== action.payload ? task : action.payload;
        })
      };
    default:
      return state;
  }
};
