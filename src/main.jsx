import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from './Components/Navbar.jsx';
import Login from './Pages/LoginPage.jsx';
import Dashboard from './Pages/DashboardPage.jsx';
import Register from './Pages/RegisterPage.jsx';
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./authManager";
import Category from './Pages/CategoryPage.jsx';
import SubCategory from './Pages/SubCategoryPage.jsx';
import Sidebar from './Components/SideBar.jsx';

const ProtectedRoute = () => {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const PreventIfAuthenticated = () => {
  const token = getToken();
  return token ? <Navigate to="/" /> : <Outlet />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<PreventIfAuthenticated />} >
          <Route index element={<Login />} />
        </Route>
        <Route path="/register" element={<PreventIfAuthenticated />} >
          <Route index element={<Register />} />
        </Route>

        <Route path="/admin/dashboard" element={<ProtectedRoute />} >
          <Route index element={<Sidebar />} />
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="/admin/dashboard/category" element={<ProtectedRoute />} >
          <Route index element={<Sidebar />} />
          <Route index element={<Category />} />
        </Route>

        <Route path="/admin/dashboard/sub-category" element={<ProtectedRoute />} >
          <Route index element={<Sidebar />} />
          <Route index element={<SubCategory />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
