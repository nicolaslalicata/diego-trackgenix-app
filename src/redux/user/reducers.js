import { SET_USER } from './constants';

const userEmail = sessionStorage.getItem('userEmail');
const default_user = { user: userEmail };

export const user_reducer = (state = default_user, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    default:
      return state;
  }
};
