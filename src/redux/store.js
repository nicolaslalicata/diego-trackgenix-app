import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { superAdminsReducer } from './superAdmins/reducers';
import { adminsReducer } from './admins/reducers';

const rootReducer = combineReducers({
  superAdmins: superAdminsReducer,
  admins: adminsReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
