import { Outlet, Navigate } from "react-router-dom";

import { authClient } from "../lib/auth-client";

const AuthRequired = () => {
  const { data: session } = authClient.useSession();

  return session ? <Outlet /> : <Navigate to="/signin" />;
};

export default AuthRequired;
