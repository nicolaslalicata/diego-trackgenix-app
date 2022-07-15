import {
  GET_MEMBERS_SUCCESS,
  MEMBERS_PENDING,
  MEMBERS_ERROR,
  ADD_MEMBERS_SUCCESS,
  DELETE_MEMBERS_SUCCESS,
  EDIT_MEMBERS_SUCCESS
} from 'redux/members/constants';

const initialState = {
  membersList: [],
  isLoading: false,
  error: '',
  successMessage: false
};
export const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        membersList: action.payload,
        isLoading: false,
        successMessage: false
      };
    case MEMBERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case MEMBERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        successMessage: ''
      };
    case ADD_MEMBERS_SUCCESS:
      return {
        ...state,
        membersList: [...state.membersList, action.payload],
        isLoading: false,
        error: false,
        successMessage: 'membersList added successfully'
      };

    case DELETE_MEMBERS_SUCCESS:
      return {
        ...state,
        membersList: state.membersList.filter((e) => e._id !== action.payload._id),
        isLoading: false,
        error: false,
        successMessage: 'membersList deleted successfully'
      };

    case EDIT_MEMBERS_SUCCESS:
      return {
        ...state,
        membersList: state.membersList.map((element) =>
          element._id === action.payload._id ? action.payload : element
        ),
        isLoading: false,
        error: false,
        successMessage: 'membersList edited successfully'
      };

    default:
      return state;
  }
};
