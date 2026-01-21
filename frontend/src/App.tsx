import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthRequired from "./components/AuthRequired";
import AuthRedirect from "./components/AuthRedirect";
import AuthWrapper from "./components/AuthWrapper";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthWrapper />,
      children: [
        {
          path: "/",
          element: <AuthRequired />,
          children: [
            // Authentication required to access these pages
            {
              path: "/",
              element: <Home />,
            },
          ],
        },
        {
          path: "/",
          element: <AuthRedirect />,
          children: [
            // Redirect Authenticated users to Home page, prevents relogin or other non-authenticated functions
            {
              path: "/signin",
              element: <SignIn />,
            },
            {
              path: "/signup",
              element: <SignUp />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
