import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admins from 'components/admins';
import SuperAdmins from 'components/superAdmins';
import Employees from 'components/employees';
import Projects from 'components/projects';
import TimeSheets from 'components/timesheets';
import Tasks from 'components/tasks';
import Home from 'components/home';

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
