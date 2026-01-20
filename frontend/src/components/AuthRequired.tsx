import { Outlet, Navigate } from "react-router-dom";

import { authClient } from "../lib/auth-client";

const AuthRequired = () => {
  const { data: session } = authClient.useSession();

  return session ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default AuthRequired;
