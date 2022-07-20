import {
  GET_MEMBERS_SUCCESS,
  ADD_MEMBERS_SUCCESS,
  DELETE_MEMBERS_SUCCESS,
  EDIT_MEMBERS_SUCCESS,
  MEMBERS_PENDING,
  MEMBERS_ERROR
} from 'redux/members/constants';

export const getMembersSuccess = (members) => ({
  type: GET_MEMBERS_SUCCESS,
  payload: members
});
export const membersPending = () => ({
  type: MEMBERS_PENDING
});
export const membersError = (error) => ({
  type: MEMBERS_ERROR,
  payload: error
});

export const addMembersSuccess = (members) => ({
  type: ADD_MEMBERS_SUCCESS,
  payload: members
});

export const deleteMembersSuccess = (members) => ({
  type: DELETE_MEMBERS_SUCCESS,
  payload: members
});

export const editMembersSuccess = (members) => ({
  type: EDIT_MEMBERS_SUCCESS,
  payload: members
});
