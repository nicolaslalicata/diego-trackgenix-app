import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admins from '../Admins/index';
import SuperAdmins from '../superAdmins1';
import Employees from '../Employees/index';
import Projects from '../Projects';
import TimeSheets from '../timesheets1/index';
import Tasks from '../tasks1/index';
import Home from '../Home';

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
    </Switch>
  );
};

export default Routes;
