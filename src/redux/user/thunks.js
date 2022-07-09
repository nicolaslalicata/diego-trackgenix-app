import { set_user, getEmployeepending, getEmployeeSuccess, getEmployeeError } from './actions';

export const setUser = (email, authenticated) => {
  return (dispatch) => {
    dispatch(set_user(email, authenticated));
  };
};

export const getEmployeeByEmail = (email) => {
  return (dispatch) => {
    dispatch(getEmployeepending());
    return fetch(`${process.env.REACT_APP_API_URL}/auth/employees/${email}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getEmployeeSuccess(response));
        return response;
      })
      .catch((error) => {
        return dispatch(getEmployeeError(error.toString()));
      });
  };
};
