import React, { Suspense, lazy } from 'react';
import { Switch, BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Admins from 'components/admins';
import SuperAdmins from 'components/superAdmins';
import Employees from 'components/employees';
import Projects from 'components/projects';
import TimeSheets from 'components/timesheets';
import Tasks from 'components/tasks';
import Home from 'components/home';
import signupUser from 'components/signup';
import loginUser from 'components/login';
import PrivateRoute from './privatesRoutes';

const EmployeesRoutes = lazy(() => import('components/routes/employeeRoutes'));

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <PrivateRoute path="/super-admins" exact component={SuperAdmins} />
      <PrivateRoute path="/admins" exact component={Admins} />
      <PrivateRoute path="/employees" exact component={Employees} />
      <PrivateRoute path="/projects" exact component={Projects} />
      <PrivateRoute path="/time-sheets" exact component={TimeSheets} />
      <PrivateRoute path="/tasks" exact component={Tasks} />
      <Route path="/sign-up" exact component={signupUser} />
      <Route path="/login" exact component={loginUser} />
      <Redirect to={'/login'} component={loginUser} />
    </Switch>
  );
};

export default Routes;
