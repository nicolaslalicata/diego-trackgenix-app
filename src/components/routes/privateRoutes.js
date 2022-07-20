import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const role = useSelector((state) => state.userLogged.user.role);
  const user = useSelector((state) => state.userLogged.user);
  const isLoading = useSelector((state) => state.userLogged.isLoading);
  const error = useSelector((state) => state.userLogged.error);
  console.log('role', role, 'errror', error);
  console.log(user);
  return (
    <Route
      {...props}
      render={(routeProps) => {
        if (isLoading) {
          return <></>;
        }
        if (props.roles.includes(role)) {
          return <RouteComponent {...routeProps} />;
        }
        if (role && !error) {
          return <Redirect to={'/'} />;
        }
        return <Redirect to={'/auth/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
