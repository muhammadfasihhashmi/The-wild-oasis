import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/features/authentication/ProtectedRoutes";
import Account from "./pages/Account";

import PageNotFound from "./pages/PageNotFound";
import { Uploader } from "./data/uploader";
import CheckInPage from "./pages/CheckInPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <AppLayout />
      </ProtectedRoutes>
    ),

    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "cabins",
        element: <Cabins />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "uploader",
        element: <Uploader />,
      },
      {
        path: "checkin/:id",
        element: <CheckInPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*", // Catch-all for 404
    element: <PageNotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
