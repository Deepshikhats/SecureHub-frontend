import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PageLoader } from "../../components";
import { authContext } from "../../context/useAuthContext";

const AuthRoute = () => {
  //@ts-ignore
  const { isValidUser } = useContext(authContext);
  if (isValidUser === null) {
    return <PageLoader />;
  } else if (isValidUser) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default AuthRoute;
