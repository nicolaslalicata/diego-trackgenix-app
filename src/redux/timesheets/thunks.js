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
  task,
  validated,
  employee,
  project
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
        startDate: startDate,
        endDate: endDate,
        hours: hours,
        task: task,
        validated: validated,
        employee: employee,
        project: project
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
  task,
  validated,
  employee,
  project,
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
        startDate: startDate,
        endDate: endDate,
        hours: hours,
        task: task,
        validated: validated,
        employee: employee,
        project: project
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

export const addComment = ({ id, description }) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(timeSheetsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({
        description: description
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
