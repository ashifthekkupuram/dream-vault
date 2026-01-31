import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthRequired from "./components/AuthRequired";
import AuthRedirect from "./components/AuthRedirect";
import AuthWrapper from "./components/AuthWrapper";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import DreamsPage from "./pages/DreamsPage";

import { ThemeProvider } from "./context/themeProvider";
import DreamCreate from "./pages/DreamCreate";
import { Toaster } from "sonner";
import DreamView from "./pages/DreamView";
import DreamEdit from "./pages/DreamEdit";

const App = () => {
  const queryClient = new QueryClient();

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
                  element: <DreamsPage />,
                },
                {
                  path: "/dream/:dreamId",
                  element: <DreamView />,
                },
                {
                  path: "/dream-edit/:dreamId",
                  element: <DreamEdit />,
                },
                {
                  path: "/dream-create",
                  element: <DreamCreate />,
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
