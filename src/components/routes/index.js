// import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Admins from 'components/admins';
import SuperAdmins from 'components/superAdmins';
import Employees from 'components/employees';
import Projects from 'components/projects';
import TimeSheets from 'components/timesheets';
import Tasks from 'components/tasks';
import Home from 'components/home';
import SignUpUser from 'components/signUp';
import loginUser from 'components/login';
import PrivateRoute from './privateRoutes';

//const EmployeesRoutes = lazy(() => import('components/routes/employeeRoutes'));

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <PrivateRoute roles={['SUPERADMIN']} path="/super-admins" exact component={SuperAdmins} />
      <PrivateRoute roles={['SUPERADMIN', 'ADMIN']} path="/admins" exact component={Admins} />
      <PrivateRoute roles={['SUPERADMIN', 'ADMIN']} path="/employees" exact component={Employees} />
      <PrivateRoute
        roles={['SUPERADMIN', 'ADMIN', 'EMPLOYEE']}
        path="/projects"
        exact
        component={Projects}
      />
      <PrivateRoute
        roles={['SUPERADMIN', 'ADMIN', 'EMPLOYEE']}
        path="/time-sheets"
        exact
        component={TimeSheets}
      />
      <PrivateRoute
        roles={['SUPERADMIN', 'ADMIN', 'EMPLOYEE']}
        path="/tasks"
        exact
        component={Tasks}
      />
      <Route path="/sign-up" exact component={SignUpUser} />
      <Route path="/auth/login" exact component={loginUser} />
    </Switch>
  );
};

export default Routes;
