import { GET_SUPERADMINS_FULFILLED, ADD_SUPERADMINS_FULFILLED } from './constants';

const initialState = {
  superAdminsList: []
};

export const superAdminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_FULFILLED:
      return {
        ...state,
        superAdminsList: action.payload
      };
    case ADD_SUPERADMINS_FULFILLED:
      return {
        ...state,
        superAdminsList: [...state.superAdminsList, action.payload]
      };
    default:
      return state;
  }
};
