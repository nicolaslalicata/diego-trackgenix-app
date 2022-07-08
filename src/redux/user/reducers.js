import { SET_USER } from './constants';

const default_user = { user: '', authenticated: false };

export const user_reducer = (state = default_user, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
        authenticated: action.authenticated
      };
    }
    default:
      return state;
  }
};
