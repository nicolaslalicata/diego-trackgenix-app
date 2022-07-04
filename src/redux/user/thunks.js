import { set_user } from './actions';

export const setUser = (email) => {
  return (dispatch) => {
    dispatch(set_user(email));
  };
};
