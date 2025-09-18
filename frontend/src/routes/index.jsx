import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ErrorPage from "../pages/Error_Page";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";

const router = createBrowserRouter([
    {
        Path: "/",
        element: <App />,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "signup",
                element: <Register/>
            },
            {
                path: "signin",
                element: <Login/>
            },
            {
                path: "dashboard",
                element: <Dashboard/>
            },
            {
                path: "dashboard/admin",
                element: <AdminDashboard/>
            }
        ]
        
    }
]);

export default router;