import {
  GET_SUPERADMINS_SUCCESS,
  ADD_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_SUCCESS,
  EDIT_SUPERADMINS_SUCCESS
} from './constants';

const initialState = {
  superAdminsList: []
};
let updatedSA = [];
export const superAdminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        superAdminsList: action.payload
      };
    case ADD_SUPERADMINS_SUCCESS:
      return {
        ...state,
        superAdminsList: [...state.superAdminsList, action.payload]
      };
    case DELETE_SUPERADMINS_SUCCESS:
      return {
        ...state,
        superAdminsList: state.superAdminsList.filter((e) => e._id !== action.payload)
      };
    case EDIT_SUPERADMINS_SUCCESS:
      updatedSA = state.list.map((item) => {
        if (item._id === action.payload._id) {
          return;
        } else {
          return item;
        }
      });
      return {
        ...state,
        superAdminsList: updatedSA
      };
    default:
      return state;
  }
};
