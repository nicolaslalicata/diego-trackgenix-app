import {
  getEmployeesSuccess,
  editEmployeesSuccess,
  deleteEmployeesSuccess,
  employeesPending,
  employeesError,
  addEmployeesSuccess
} from 'redux/employees/actions';

export const getEmployees = () => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(employeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getEmployeesSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(employeesError(error.toString()));
      });
  };
};

export const deleteEmployees = (employees) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(employeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees/${employees._id}`, {
      method: 'DELETE',
      headers: { token }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteEmployeesSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(employeesError(error.toString()));
      });
  };
};

export const editEmployee = (employees, firstName, lastName, email, phone, password, active) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(employeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees/${employees._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
        active: active
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if ((!firstName || !lastName || !email || !password) && data.error) {
          dispatch(employeesError(data.message));
        } else {
          dispatch(editEmployeesSuccess(data.data));
        }
      });
  };
};

export const addNewEmployee = (firstName, lastName, email, phone, password, active) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(employeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
        active: active
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(addEmployeesSuccess(response.data));
        } else {
          dispatch(employeesError(response.error));
        }
      });
  };
};
