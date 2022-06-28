import {
  getEmployeesSuccess,
  editEmployeesSuccess,
  deleteEmployeesSuccess,
  employeesPending,
  employeesError,
  addEmployeesSuccess
} from './actions';

export const getEmployees = () => {
  return (dispatch) => {
    dispatch(employeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getEmployeesSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        dispatch(employeesError(error.toString()));
      });
  };
};
export const deleteEmployees = (employees) => {
  return (dispatch) => {
    dispatch(employeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees/${employees._id}`, {
      method: 'DELETE'
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
export const editEmployee = (
  employees,
  firstName,
  lastName,
  email,
  phone,
  password,
  active,
  setIsEditModalOpen
) => {
  return (dispatch) => {
    dispatch(employeesPending());
    console.log(firstName);
    return fetch(`${process.env.REACT_APP_API_URL}/employees/${employees._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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
          // setIsEditModalOpen(false);
        } else {
          dispatch(editEmployeesSuccess(data.data));
          // setIsEditModalOpen(false);
        }
      });
    // .then(() => getEmployees()(dispatch));
  };
};
export const addNewEmployee = (firstName, lastName, email, phone, password, active) => {
  return (dispatch) => {
    dispatch(employeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
    // .then(() => getEmployees()(dispatch));
  };
};
