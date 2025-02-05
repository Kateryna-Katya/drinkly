import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated} from "../redux/auth/selectors";

const PrivateRoute = ({ component, redirectTo = "/signin" }) => {
  const isAuthenticated  = useSelector(selectIsAuthenticated);

  return isAuthenticated ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;