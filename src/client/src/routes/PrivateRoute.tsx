import React from "react";
import { Navigate, RouteProps } from "react-router-dom";

type PrivateRouteProps = {
  auth: {
    isAuthenticated: boolean;
  };
  children: JSX.Element;
} & RouteProps;

const PrivateRoute = ({
  auth: { isAuthenticated },
  children,
}: PrivateRouteProps) => {
  return isAuthenticated ? children : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
