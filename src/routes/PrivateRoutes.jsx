import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getItem } from "../helpers/utils/localStorage";

const PrivateRoutes = () => {
  const [auth, setAuth] = useState(true);
  useEffect(() => {
    const token = getItem("token");
    if (!token) {
      setAuth(false);
      return;
    }
    setAuth(true);
  }, []);
  return auth ? <Outlet></Outlet> : <Navigate to="/signIn"></Navigate>;
};

export default PrivateRoutes;
