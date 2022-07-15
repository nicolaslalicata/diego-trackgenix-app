import {
  getAdminsSuccess,
  getAdminsPending,
  getAdminsError,
  addAdminSuccess,
  addAdminPending,
  addAdminError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError,
  editAdminPending,
  editAdminSuccess,
  editAdminError
} from 'redux/admins/actions';

export const getAdmins = () => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(getAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins/`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getAdminsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getAdminsError(error.message.toString()));
      });
  };
};

export const createAdmin = (name, lastName, email, gender, status, password) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(addAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({
        firstName: name,
        lastName: lastName,
        email: email,
        gender: gender,
        active: status,
        password: password
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(addAdminSuccess(response.data));
          // setSucModalIsOpen(true);
        } else {
          dispatch(addAdminError(response.error));
        }
      })
      .then(() => getAdmins()(dispatch));
  };
};

export const deleteAdmin = (admin) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(deleteAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins/${admin._id}`, {
      method: 'DELETE',
      headers: { token }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteAdminSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        dispatch(deleteAdminError(error.toString()));
      });
  };
};

export const editAdmin = (name, lastName, email, gender, status, password, admin) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(editAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins/${admin._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({
        firstName: name,
        lastName: lastName,
        email: email,
        gender: gender,
        active: status,
        password: password
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(editAdminSuccess(response.data));
        } else {
          dispatch(editAdminError(response.message));
        }
      })
      .then(() => getAdmins()(dispatch));
  };
};
