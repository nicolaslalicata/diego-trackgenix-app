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
} from 'redux/superAdmins/actions';

export const getSuperAdmins = () => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(getSuperAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins`, { headers: { token } })
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

export const deleteSuperAdmin = (_id, setIsOpen, setModalNotification) => {
  return async (dispatch) => {
    try {
      dispatch(deleteSuperAdminsPending());
      const resp = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${_id}`, {
        method: 'DELETE'
      });
      const data = await resp.json();
      dispatch(deleteSuperAdminsSuccess(data.data));
      setIsOpen(false);
      setModalNotification({
        modalNotification: true,
        title: 'Super admin deleted successfully'
      });
    } catch (error) {
      dispatch(deleteSuperAdminsError(error.message));
    }
  };
};

export const addSuperAdmin = (superAdmin, setIsOpenAdd, setModalNotification) => {
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
      if (response.status === 400) {
        dispatch(addSuperAdminsError());
        setModalNotification({
          modalNotification: true,
          title: 'There is a validation error, please check the information'
        });
      }
      if (response.status === 201) {
        const data = await response.json();
        dispatch(addSuperAdminsSuccess(data.data));
        setIsOpenAdd(false);
        setModalNotification({
          modalNotification: true,
          title: 'Super admin created successfully'
        });
      }
    } catch (error) {
      dispatch(addSuperAdminsError(error.message));
    }
  };
};

export const editSuperAdmin = (
  editSadmin,
  superAdmin,
  setIsOpenEdit,
  setModalNotification,
  reset
) => {
  const { firstName, lastName, email, password } = editSadmin;
  return async (dispatch) => {
    dispatch(editSuperAdminsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/super-admins/${superAdmin._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ firstName, lastName, email, password })
        }
      );
      if (response.status === 400) {
        dispatch(editSuperAdminsError());
        setModalNotification({
          modalNotification: true,
          title: 'There is a validation error, please check the information'
        });
      }
      if (response.status === 201) {
        const data = await response.json();
        if (data.error) {
          throw data.message;
        }
        dispatch(
          editSuperAdminsSuccess(
            {
              _id: data.data._id,
              firstName,
              lastName,
              email,
              password
            },
            superAdmin._id
          )
        );
        setIsOpenEdit(false);
        setModalNotification({
          modalNotification: true,
          title: 'Super admin edited successfully'
        });
        reset({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        });
      }
    } catch (error) {
      dispatch(editSuperAdminsError(error));
    }
  };
};
