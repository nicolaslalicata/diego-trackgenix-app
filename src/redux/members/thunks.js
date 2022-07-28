import {
  getMembersSuccess,
  editMembersSuccess,
  deleteMembersSuccess,
  membersPending,
  membersError,
  addMembersSuccess
} from 'redux/members/actions';

export const getMembers = () => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(membersPending());
    return fetch(`${process.env.REACT_APP_API_URL}/members`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getMembersSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(membersError(error.toString()));
      });
  };
};
export const deleteMember = (member) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(membersPending());
    return fetch(`${process.env.REACT_APP_API_URL}/members/${member._id}`, {
      method: 'DELETE',
      headers: { token }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteMembersSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(membersError(error.toString()));
      });
  };
};
export const editMember = (_id, employeeId, role, rate) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(membersPending());
    return fetch(`${process.env.REACT_APP_API_URL}/members/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({
        employeeId,
        role,
        rate
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(editMembersSuccess(response.data));
        } else {
          dispatch(membersError(response.message));
        }
      });
  };
};

export const addMember = (employee, role, rate) => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(membersPending());
    return fetch(`${process.env.REACT_APP_API_URL}/members/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({
        employee: employee,
        role: role,
        rate: rate
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(addMembersSuccess(response.data));
        } else {
          dispatch(membersError(response.error));
        }
      });
  };
};
