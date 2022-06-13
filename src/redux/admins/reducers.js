import { GET_ADMINS_FULFILLED, ADD_ADMIN_FULFILLED } from './constants';
const initialState = {
  actions: []
};

export const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS_FULFILLED:
      return {
        ...state,
        list: action.admins
      };
    case ADD_ADMIN_FULFILLED:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    default:
      return state;
  }
};
