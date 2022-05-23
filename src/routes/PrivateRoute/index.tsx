import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  children,
  authenticated,
  redirectTo,
}: {
  children: any;
  authenticated: boolean;
  redirectTo: string;
}) => {
  return authenticated ? children : <Navigate replace to={redirectTo} />;
};

export default PrivateRoute;
