import {
  GET_TIMESHEETS_SUCCESS,
  TIMESHEETS_PENDING,
  TIMESHEETS_ERROR,
  ADD_TIMESHEETS_SUCCESS,
  DELETE_TIMESHEETS_SUCCESS,
  EDIT_TIMESHEETS_SUCCESS
} from './constants';

const initialState = {
  timeSheetsList: [],
  isLoading: false,
  error: ''
};
export const timeSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        timeSheetsList: action.payload,
        isLoading: false
      };
    case TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case TIMESHEETS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case ADD_TIMESHEETS_SUCCESS:
      return {
        ...state,
        timeSheetsList: [...state.timeSheetsList, action.payload],
        isLoading: false,
        error: false
      };

    case DELETE_TIMESHEETS_SUCCESS:
      return {
        ...state,
        timeSheetsList: state.timeSheetsList.filter((e) => e._id !== action.payload._id),
        isLoading: false,
        error: false
      };

    case EDIT_TIMESHEETS_SUCCESS:
      return {
        ...state,
        timeSheetsList: state.timeSheetsList.map((element) =>
          element._id === action.payload._id ? action.payload : element
        ),
        isLoading: false,
        error: false
      };

    default:
      return state;
  }
};
