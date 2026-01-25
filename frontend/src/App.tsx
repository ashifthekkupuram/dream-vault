import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthRequired from "./components/AuthRequired";
import AuthRedirect from "./components/AuthRedirect";
import AuthWrapper from "./components/AuthWrapper";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import Dreams from "./pages/Dreams";

import { ThemeProvider } from "./context/themeProvider";

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
              element: <SidebarContainer />,
              children: [
                {
                  path: "/",
                  element: <Home />,
                },
                {
                  path: "/dreams",
                  element: <Dreams />,
                },
              ],
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

  return (
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
