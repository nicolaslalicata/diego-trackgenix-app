import {
  getTimeSheetsSuccess,
  editTimeSheetsSuccess,
  deleteTimeSheetsSuccess,
  timeSheetsPending,
  timeSheetsError,
  addTimeSheetsSuccess
} from 'redux/timesheets/actions';

export const getTimeSheets = () => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(timeSheetsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/timesheets`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getTimeSheetsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(timeSheetsError(error.toString()));
      });
  };
};
export const deleteTimeSheet = (timeSheet) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(timeSheetsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/timesheets/${timeSheet._id}`, {
      method: 'DELETE',
      headers: { token }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteTimeSheetsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(timeSheetsError(error.toString()));
      });
  };
};
export const editTimeSheet = (
  timeSheet,
  description,
  startDate,
  endDate,
  hours,
  tasks,
  validated,
  employeeId,
  projectId
) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(timeSheetsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/timesheets/${timeSheet._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({
        description: description,
        taskId: tasks,
        validated: validated,
        employeeId: employeeId,
        projectId: projectId,
        startDate: startDate,
        endDate: endDate,
        hours: hours
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(editTimeSheetsSuccess(response.data));
        } else {
          dispatch(timeSheetsError(response.message));
        }
      });
  };
};

export const addTimesheet = (
  description,
  taskId,
  validated,
  employeeId,
  projectId,
  startDate,
  endDate,
  hours
) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(timeSheetsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/timesheets/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({
        description: description,
        taskId: taskId,
        validated: validated,
        employeeId: employeeId,
        projectId: projectId,
        startDate: startDate,
        endDate: endDate,
        hours: hours
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(addTimeSheetsSuccess(response.data));
        } else {
          dispatch(timeSheetsError(response.error));
        }
      });
  };
};
