import { Outlet, Navigate } from "react-router-dom";

import { useAuthContext } from "../context/authContext/authContext";

const PublicRoutes = () => {
  const { userState: user } = useAuthContext();
  return user.user ? <Navigate to="/chat" /> : <Outlet />;
};

export default PublicRoutes;
