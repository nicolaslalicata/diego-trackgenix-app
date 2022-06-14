import {
  getSuperAdminsSuccess,
  getSuperAdminsPending,
  getSuperAdminsError,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsPending,
  deleteSuperAdminsError,
  addSuperAdminsSuccess,
  addSuperAdminsPending,
  addSuperAdminsError,
  editSuperAdminsSuccess,
  editSuperAdminsPending,
  editSuperAdminsError
} from './actions';

export const getSuperAdmins = () => {
  return (dispatch) => {
    dispatch(getSuperAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getSuperAdminsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getSuperAdminsError(error.message.toString()));
      });
  };
};

export const deleteSuperAdmin = (_id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteSuperAdminsPending());
      const resp = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${_id}`, {
        method: 'DELETE'
      });
      const data = resp.json;
      dispatch(deleteSuperAdminsSuccess(data));
    } catch (error) {
      dispatch(deleteSuperAdminsError(error.message));
    }
  };
};

export const newSuperAdmin = (superAdmin) => {
  return async (dispatch) => {
    try {
      dispatch(addSuperAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      dispatch(addSuperAdminsSuccess(data.data));
    } catch (error) {
      dispatch(addSuperAdminsError(error.message));
    }
  };
};

export const editSuperAdmin = (superAdmin, superadminId) => {
  const { firstName, lastName, email, password } = superAdmin;
  return async (dispatch) => {
    dispatch(editSuperAdminsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/super-admins/${superadminId}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ firstName, lastName, email, password })
        }
      );
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(
        editSuperAdminsSuccess(
          {
            _id: res.data._id,
            firstName,
            lastName,
            email,
            password
          },
          superadminId
        )
      );
    } catch (error) {
      dispatch(editSuperAdminsError(error));
    }
  };
};
