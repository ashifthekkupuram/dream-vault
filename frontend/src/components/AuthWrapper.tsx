import { Outlet } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import { Spinner } from "./ui/spinner";

const AuthWrapper = () => {
  const { isPending, isRefetching } = authClient.useSession();

  return isPending || isRefetching ? (
    <div className="flex justify-center items-center w-full h-screen">
      <Spinner className="size-16" />
    </div>
  ) : (
    <Outlet />
  );
};

export default AuthWrapper;
