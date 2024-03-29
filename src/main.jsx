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
import EditCategoryComponent from './Components/EditCategoryComponent.jsx';
import EditSubCategoryComponent from './Components/EditSubCategoryComponent.jsx';
import Product from './Pages/ProductPage.jsx';
import EditProductComponent from './Components/EditProductComponent.jsx';
import Home from './Pages/HomePage.jsx';
import Cart from './Pages/CartPage.jsx';
import Wishlist from './Pages/WishlistPage.jsx';
import Checkout from './Pages/CheckoutPage.jsx';
import Order from './Pages/OrderPage.jsx';
import OrderDetails from './Pages/OrderDetailsPage.jsx';
import Profile from './Pages/ProfilePage.jsx';
import ProductDetails from './Pages/ProductDetailsPage.jsx';
import Logout from './Pages/LogoutPage.jsx';
import AllProducts from './Pages/AllProductsPage.jsx';
import Navbar2 from './Components/Navbar2.jsx';

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
      {/* <Navbar2 /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />

        <Route path="/all-products/:categoryId?/:subCategoryId?" element={<AllProducts />} />

        <Route path="/login" element={<PreventIfAuthenticated />} >
          <Route index element={<Login />} />
        </Route>
        <Route path="/register" element={<PreventIfAuthenticated />} >
          <Route index element={<Register />} />
        </Route>

        <Route path="/admin/dashboard" element={<ProtectedRoute />} >
          <Route index element={<>
            <Sidebar />
            <Dashboard />
          </>} />
          <Route path="/admin/dashboard/category" element={<>
            <Sidebar />
            <Category />
          </>} />
          <Route path="/admin/dashboard/category/edit/:id" element={<>
            <Sidebar />
            <EditCategoryComponent />
          </>} />
          <Route path="/admin/dashboard/sub-category" element={<>
            <Sidebar />
            <SubCategory />
          </>} />
          <Route path="/admin/dashboard/sub-category/edit/:id" element={<>
            <Sidebar />
            <EditSubCategoryComponent />
          </>} />
          <Route path="/admin/dashboard/product" element={<>
            <Sidebar />
            <Product />
          </>} />
          <Route path="/admin/dashboard/product/edit/:id" element={<>
            <Sidebar />
            <EditProductComponent />
          </>} />
          <Route path="/admin/dashboard/order" element={<>
            <Sidebar />
            <Order />
          </>} />
          <Route path="/admin/dashboard/order/detail/:id" element={<>
            <Sidebar />
            <OrderDetails />
          </>} />
        </Route>

        <Route path="/profile" element={<ProtectedRoute />} >
          <Route index element={<Profile />} />
        </Route>

        <Route path="/cart" element={<ProtectedRoute />} >
          <Route index element={<Cart />} />
        </Route>
        <Route path="/wishlist" element={<ProtectedRoute />} >
          <Route index element={<Wishlist />} />
        </Route>
        <Route path="/checkout" element={<ProtectedRoute />} >
          <Route index element={<Checkout />} />
        </Route>

        <Route path="/logout" element={<ProtectedRoute />} >
          <Route index element={<Logout />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
