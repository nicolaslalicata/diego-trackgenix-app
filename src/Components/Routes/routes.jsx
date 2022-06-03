import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admins from '../Admins/index';
import SuperAdmins from '../SuperAdmins';
import SuperAdminsForm from '../SuperAdmins/Form';
import Employees from '../Employees/index';
import Projects from '../Projects';
import TimeSheets from '../TimeSheets/index';
import Tasks from '../Tasks/index';

const Routes = () => {
  return (
    <Switch>
      <Route path="/super-admins" exact component={SuperAdmins} />
      <Route path="/super-admins/form" exact component={SuperAdminsForm} />
      <Route path="/admins" exact component={Admins} />
      <Route path="/employees" exact component={Employees} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/time-sheets" exact component={TimeSheets} />
      <Route path="/tasks" exact component={Tasks} />
    </Switch>
  );
};

export default Routes;
