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

export const deleteSuperAdmin = (_id, setIsOpen, setIsOpenDeleted) => {
  return async (dispatch) => {
    try {
      dispatch(deleteSuperAdminsPending());
      const resp = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${_id}`, {
        method: 'DELETE'
      });
      const data = await resp.json();
      dispatch(deleteSuperAdminsSuccess(data.data));
      setIsOpen(false);
      setIsOpenDeleted(true);
    } catch (error) {
      dispatch(deleteSuperAdminsError(error.message));
    }
  };
};

export const newSuperAdmin = (superAdmin, setIsOpenAdd, setIsOpenCreated) => {
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
      setIsOpenAdd(false);
      setIsOpenCreated(true);
    } catch (error) {
      dispatch(addSuperAdminsError(error.message));
    }
  };
};

export const editSuperAdmin = (superAdmin, superadminId, setIsOpenEdit, setIsOpenEdited) => {
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
      setIsOpenEdit(false);
      setIsOpenEdited(true);
    } catch (error) {
      dispatch(editSuperAdminsError(error));
    }
  };
};
