import { Outlet, Navigate } from "react-router-dom";

import { authClient } from "../lib/auth-client";

const AuthRedirect = () => {
  const { data: session } = authClient.useSession();

  return session ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRedirect;
