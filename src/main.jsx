import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from './Components/Navbar.jsx';
import Login from './Pages/LoginPage.jsx';
import Dashboard from './Pages/DashboardPage.jsx';
import Register from './Pages/RegisterPage.jsx';
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./authManager";

const ProtectedRoute = () => {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const PreventIfAuthenticated = () => {
  const token = getToken();
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/login",
    element: <PreventIfAuthenticated />,
    children: [{ index: true, element: <Login /> }]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [{ index: true, element: <Dashboard /> },],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
