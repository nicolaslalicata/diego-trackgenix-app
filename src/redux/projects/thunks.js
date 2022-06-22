import { getProjectsSuccess, getProjectsPending, getProjectsError } from './actions';
import { addProjectsSuccess, addProjectsPending, addProjectsError } from './actions';
import { deleteProjectsSuccess, deleteProjectsPending, deleteProjectsError } from './actions';
import { editProjectsSuccess, editProjectsPending, editProjectsError } from './actions';

export const getProjects = () => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getProjectsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getProjectsError(error.toString()));
      });
  };
};

export const addProject = (userInput, setModalNotification) => {
  return async (dispatch) => {
    dispatch(addProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
      body: JSON.stringify(userInput),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(addProjectsSuccess(response.data));
          setModalNotification({
            modalNotification: true,
            message: 'Add Project Successfully'
          });
        } else {
          dispatch(addProjectsError(response.error.toString()));
          setModalNotification({
            modalNotification: true,
            message: 'Error in Add Project'
          });
        }
      });
  };
};

export const editProject = (userInput, setModalNotification) => {
  // eslint-disable-next-line no-unused-vars
  const { _id, __v, ...other } = userInput;
  return async (dispatch) => {
    dispatch(editProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
      method: 'PUT',
      body: JSON.stringify(other),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(editProjectsSuccess(response.data));
          setModalNotification({
            modalNotification: true,
            message: 'Edit Project Successfully'
          });
        } else {
          dispatch(editProjectsError(response.error.toString()));
          setModalNotification({
            modalNotification: true,
            message: 'Error in Edit Project'
          });
          //   dispatch(editProjectsSuccess(response.data));
          //   setModalNotification({
          //     modalNotification: true,
          //     message: 'Edit Project Successfully'
          //   });
          // })
          // .catch((error) => {
          //   dispatch(editProjectsError(error.toString()));
          //   setModalNotification({
          //     modalNotification: true,
          //     message: 'Error in Edit Project'
          //   });
        }
      });
  };
};

export const deleteProject = (userInput, setModalNotification) => {
  const params = { method: 'delete' };
  const id = userInput._id;
  return async (dispatch) => {
    dispatch(deleteProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, params)
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(deleteProjectsSuccess(response.data));
          setModalNotification({
            modalNotification: true,
            message: 'Delete Project Successfully'
          });
        } else {
          dispatch(deleteProjectsError(response.error.toString()));
          setModalNotification({
            modalNotification: true,
            message: 'Error in Delete Project'
          });
        }
      });
  };
};

//{
//   return async (dispatch) => {
//     try {
//       dispatch(deleteSuperAdminsPending());
//       const resp = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${_id}`, {
//         method: 'DELETE'
//       });
//       const data = await resp.json();
//       dispatch(deleteSuperAdminsSuccess(data.data));
//       setIsOpen(false);
//       setModalNotification({
//         modalNotification: true,
//         message: 'Super admin deleted successfully'
//       });
//     } catch (error) {
//       dispatch(deleteSuperAdminsError(error.message));
//     }
//   };
// };

// export const deleteProject = (userInput, setModalCloseOpen, setModalNotification) => {
//   const params = { method: 'delete' };
//   const id = userInput._id;
//   return async (dispatch) => {
//     try {
//       dispatch(deleteProjectsPending());
//       const enviodeborrado = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, params);
//       const datos = await enviodeborrado.json();
//       dispatch(deleteProjectsSuccess(datos.data));
//       setModalCloseOpen(false);
//       setModalNotification({
//         modalNotification: true,
//         message: 'Project deleted successfully'
//       });
//     } catch (error) {
//       dispatch(deleteProjectsError(error.message));
//     }
//   };
// };

//chakii

// export const getSuperAdmins = () => {
//   return (dispatch) => {
//     dispatch(getSuperAdminsPending());
//     return fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
//       .then((response) => response.json())
//       .then((response) => {
//         dispatch(getSuperAdminsSuccess(response.data));
//         return response.data;
//       })
//       .catch((error) => {
//         dispatch(getSuperAdminsError(error.message.toString()));
//       });
//   };
// };

// export const deleteSuperAdmin = (_id, setIsOpen, setModalNotification) => {
//   return async (dispatch) => {
//     try {
//       dispatch(deleteSuperAdminsPending());
//       const resp = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${_id}`, {
//         method: 'DELETE'
//       });
//       const data = await resp.json();
//       dispatch(deleteSuperAdminsSuccess(data.data));
//       setIsOpen(false);
//       setModalNotification({
//         modalNotification: true,
//         message: 'Super admin deleted successfully'
//       });
//     } catch (error) {
//       dispatch(deleteSuperAdminsError(error.message));
//     }
//   };
// };

// export const addSuperAdmin = (superAdmin, setIsOpenAdd, setModalNotification) => {
//   return async (dispatch) => {
//     try {
//       dispatch(addSuperAdminsPending());
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json'
//         },
//         body: JSON.stringify(superAdmin)
//       });
//       if (response.status === 400) {
//         dispatch(addSuperAdminsError());
//         setModalNotification({
//           modalNotification: true,
//           message: 'There is a validation error, please check the information'
//         });
//       }
//       if (response.status === 201) {
//         const data = await response.json();
//         dispatch(addSuperAdminsSuccess(data.data));
//         console.log(data);
//         console.log(response);
//         setIsOpenAdd(false);
//         setModalNotification({
//           modalNotification: true,
//           message: 'Super admin created successfully'
//         });
//       }
//     } catch (error) {
//       dispatch(addSuperAdminsError(error.message));
//     }
//   };
// };

// export const editSuperAdmin = (superAdmin, superadminId, setIsOpenEdit, setModalNotification) => {
//   const { firstName, lastName, email, password } = superAdmin;
//   return async (dispatch) => {
//     dispatch(editSuperAdminsPending());
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/super-admins/${superadminId}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-type': 'application/json'
//           },
//           body: JSON.stringify({ firstName, lastName, email, password })
//         }
//       );
//       if (response.status === 400) {
//         dispatch(editSuperAdminsError());
//         setModalNotification({
//           modalNotification: true,
//           message: 'There is a validation error, please check the information'
//         });
//       }
//       if (response.status === 201) {
//         const data = await response.json();
//         if (data.error) {
//           throw data.message;
//         }
//         dispatch(
//           editSuperAdminsSuccess(
//             {
//               _id: data.data._id,
//               firstName,
//               lastName,
//               email,
//               password
//             },
//             superadminId
//           )
//         );
//         setIsOpenEdit(false);
//         setModalNotification({
//           modalNotification: true,
//           message: 'Super admin edited successfully'
//         });
//       }
//     } catch (error) {
//       dispatch(editSuperAdminsError(error));
//     }
//   };
// };
