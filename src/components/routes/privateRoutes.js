import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const role = useSelector((state) => state.auth.authenticated?.role);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  return (
    <Route
      {...props}
      render={(routeProps) => {
        if (isLoading) {
          return <></>;
        }
        if (role === props.role) {
          return <RouteComponent {...routeProps} />;
        }
        if (role && !error) {
          return <Redirect to={'/login'} />;
        }
        return <Redirect to={'/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
