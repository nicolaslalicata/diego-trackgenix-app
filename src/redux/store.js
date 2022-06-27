import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { superAdminsReducer } from './superAdmins/reducers';
import { timeSheetReducer } from './timesheets/reducers';
import { projectsReducer } from './projects/reducers';
import { adminsReducer } from './admins/reducers';
import { employeesReducer } from './employees/reducers';
import { tasksReducer } from './tasks/reducers';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  superAdmins: superAdminsReducer,
  timeSheets: timeSheetReducer,
  projects: projectsReducer,
  employees: employeesReducer,
  admins: adminsReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
