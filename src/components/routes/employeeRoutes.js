/* eslint-disable no-unused-vars */
import { Switch, Redirect, useRouteMatch, Route } from 'react-router-dom';
import Tasks from 'components/tasks';
import Layout from 'components/layout';
import TimeSheets from 'components/timesheets';
import Projects from 'components/projects';
import loginUser from 'components/login';
// import PrivateRoute from './privatesRoutes';

const employeesRoutes = [
  { name: 'Timesheets', path: '/time-sheets' },
  { name: 'Projects', path: '/projects' },
  { name: 'Tasks', path: '/tasks' }
];

const EmployeesRoutes = () => {
  return (
    <Layout routes={employeesRoutes}>
      <Switch>
        <Route path={'/tasks'} component={Tasks} />
        <Route path={'/projects'} component={Projects} />
        <Route path={'/login'} component={loginUser} />
        <Route to={'/time-sheets'} component={TimeSheets} />
        <Redirect to={'/login'} />
      </Switch>
    </Layout>
  );
};
export default EmployeesRoutes;
