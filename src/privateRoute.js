import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth";

const PrivateRoute = ({ component: RouteComponent, renders, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={routeProps =>
        currentUser ? <RouteComponent {...routeProps} />
          : <Redirect to={{ pathname: "/login", state: { from: routeProps.location } }} />
      }
    />
  );
};

export default PrivateRoute
