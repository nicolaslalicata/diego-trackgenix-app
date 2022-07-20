import { Switch, Route, Redirect } from 'react-router-dom';
import Login from 'components/login';
import Layout from 'components/layout';
import SignUp from 'components/signUp';

const authRoutes = [{ name: 'Log In', path: '/auth/login' }];

const AuthRoutes = () => {
  return (
    <Layout routes={authRoutes}>
      <Switch>
        <Route path={'/auth/login'} component={Login} />
        <Route path={'/signup'} component={SignUp} />
        <Redirect to={'/auth/login'} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
