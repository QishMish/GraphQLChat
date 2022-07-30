import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext/authContext";

const PrivateRoutes = () => {
  const { userState: user } = useAuthContext();
  return user.user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
