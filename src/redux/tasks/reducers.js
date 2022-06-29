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
const initialState = {
  tasksList: []
};
export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasksList: action.payload,
        isLoading: false
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case ADD_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasksList: [...state.tasksList, action.payload],
        isLoading: false
      };
    case ADD_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasksList: state.tasksList.filter((task) => task._id !== action.payload._id),
        isLoading: false
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case EDIT_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        tasksList: state.tasksList.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        isLoading: false
      };
    case EDIT_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
