import { SET_USER } from './constants';

export const set_user = (user, authenticated) => {
  return {
    type: SET_USER,
    payload: user,
    authenticated
  };
};
