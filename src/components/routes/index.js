// import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Admins from 'components/admins';
import SuperAdmins from 'components/superAdmins';
import Employees from 'components/employees';
import Projects from 'components/projects';
import TimeSheets from 'components/timesheets';
import Tasks from 'components/tasks';
import Home from 'components/home';
import signupUser from 'components/signup';
import loginUser from 'components/login';
// import PrivateRoute from './privatesRoutes';

//const EmployeesRoutes = lazy(() => import('components/routes/employeeRoutes'));

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/super-admins" exact component={SuperAdmins} />
      <Route path="/admins" exact component={Admins} />
      <Route path="/employees" exact component={Employees} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/time-sheets" exact component={TimeSheets} />
      <Route path="/tasks" exact component={Tasks} />
      <Route path="/sign-up" exact component={signupUser} />
      <Route path="/auth/login" exact component={loginUser} />
      {/* <Redirect to={'/auth/login'} component={loginUser} /> */}
    </Switch>
  );
};

export default Routes;
