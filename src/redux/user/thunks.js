import { set_user } from './actions';

export const setUser = (email, authenticated) => {
  return (dispatch) => {
    dispatch(set_user(email, authenticated));
  };
};
