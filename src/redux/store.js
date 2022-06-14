import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { superAdminsReducer } from './superAdmins/reducers';
import { timeSheetReducer } from './timesheets/reducers';

const rootReducer = combineReducers({
  superAdmins: superAdminsReducer,
  timeSheets: timeSheetReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
