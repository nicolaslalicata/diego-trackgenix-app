import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { superAdminsReducer } from 'redux/superAdmins/reducers';
import { timeSheetReducer } from 'redux/timesheets/reducers';
import { projectsReducer } from 'redux/projects/reducers';
import { adminsReducer } from 'redux/admins/reducers';
import { employeesReducer } from 'redux/employees/reducers';
import { tasksReducer } from 'redux/tasks/reducers';
import { logReducer } from 'redux/auth/reducers';
import { membersReducer } from 'redux/members/reducers';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  superAdmins: superAdminsReducer,
  timeSheets: timeSheetReducer,
  projects: projectsReducer,
  employees: employeesReducer,
  admins: adminsReducer,
  userLogged: logReducer,
  members: membersReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
