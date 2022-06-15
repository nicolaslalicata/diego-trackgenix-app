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
} from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins/`)
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

export const createAdmin = (name, lastName, email, gender, status, password, setShowAddModal) => {
  return (dispatch) => {
    dispatch(addAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
          alert('added successfully');
        } else {
          dispatch(addAdminError(response.error));
        }
      })
      .then(() => getAdmins()(dispatch))
      .then(() => setShowAddModal(false));
  };
};

export const deleteAdmin = (admin) => {
  return (dispatch) => {
    dispatch(deleteAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins/${admin._id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteAdminSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(deleteAdminError(error.toString()));
      });
  };
};

export const editAdmin = (
  name,
  lastName,
  email,
  gender,
  status,
  password,
  setShowEditModal,
  admin
) => {
  return (dispatch) => {
    dispatch(editAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins/${admin._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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
          alert('Edited successfully');
        } else {
          console.log(response.message);
          dispatch(editAdminError(response.message));
          setShowEditModal(true);
        }
      })
      .then(() => getAdmins()(dispatch));
  };
};
