import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Announcement from "./components/Announcement";
import Footer from "./components/Footer";
import AdminFlyout from "./components/admin/AdminFlyout";
import Admin from "./pages/Admin/Admin";

const App = () => {
  const user = false;

  return (
    <Router>
      <Announcement />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/category/:id" element={<ProductList/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
