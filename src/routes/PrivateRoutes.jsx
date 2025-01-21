import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getItem } from "../helpers/utils/localStorage";

const PrivateRoutes = () => {
  const [auth, setAuth] = useState(true);
  useEffect(() => {
    const users = getItem("users");
    if (!users) {
      setAuth(false);
      return;
    }
    const getuserMail = getItem("userMail");
    if (!getuserMail) {
      setAuth(false);
      return;
    }
    setAuth(true);
  }, []);
  return auth ? <Outlet></Outlet> : <Navigate to="/signIn"></Navigate>;
};

export default PrivateRoutes;
