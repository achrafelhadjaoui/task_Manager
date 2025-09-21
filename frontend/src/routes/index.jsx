import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ErrorPage from "../pages/Error_Page";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import UserChecked from "../components/UserChecked";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // Public routes with UserChecked
      {
        element: <UserChecked />,   // 👈 check if user exists
        children: [
          { index: true, element: <Home /> },
          { path: "signup", element: <Register /> },
          { path: "signin", element: <Login /> },
        ],
      },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "dashboard/admin", element: <AdminDashboard /> },
        ],
      },
    ],
  },
]);

export default router;
