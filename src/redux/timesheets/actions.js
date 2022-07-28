import {
  GET_TIMESHEETS_SUCCESS,
  ADD_TIMESHEETS_SUCCESS,
  DELETE_TIMESHEETS_SUCCESS,
  EDIT_TIMESHEETS_SUCCESS,
  TIMESHEETS_PENDING,
  TIMESHEETS_ERROR
} from 'redux/timesheets/constants';

export const getTimeSheetsSuccess = (timeSheets) => ({
  type: GET_TIMESHEETS_SUCCESS,
  payload: timeSheets
});

export const timeSheetsPending = () => ({
  type: TIMESHEETS_PENDING
});

export const timeSheetsError = (error) => ({
  type: TIMESHEETS_ERROR,
  payload: error
});

export const addTimeSheetsSuccess = (timeSheets) => ({
  type: ADD_TIMESHEETS_SUCCESS,
  payload: timeSheets
});

export const deleteTimeSheetsSuccess = (timeSheets) => ({
  type: DELETE_TIMESHEETS_SUCCESS,
  payload: timeSheets
});

export const editTimeSheetsSuccess = (timeSheets) => ({
  type: EDIT_TIMESHEETS_SUCCESS,
  payload: timeSheets
});
