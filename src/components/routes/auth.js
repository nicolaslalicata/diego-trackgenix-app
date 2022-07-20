import { Switch, Route, Redirect } from 'react-router-dom';
import Login from 'Components/Auth/Login';
import Layout from 'Components/Layout';
import signup from 'Components/Auth/signup';

const authRoutes = [{ name: 'Log In', path: '/auth/login' }];

const AuthRoutes = () => {
  return (
    <Layout routes={authRoutes}>
      <Switch>
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={signup} />
        <Redirect to={'/login'} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
