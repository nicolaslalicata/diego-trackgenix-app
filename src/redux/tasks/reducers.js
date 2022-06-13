import { GET_TASKS_FULFILLED } from './constants';

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
    default:
      return state;
  }
};
