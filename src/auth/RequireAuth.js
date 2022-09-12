import { Navigate, useLocation } from "react-router-dom";
import * as React from "react";
import AuthContext from "./AuthProvider";

function RequireAuth({ children }) {
  let auth = React.useContext(AuthContext);
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
