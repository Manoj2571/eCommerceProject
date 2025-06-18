import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Header from "./components/Header";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetail from "./features/products/ProductDetail";
import HomePage from "./pages/HomePage";
import Order from "./features/order/Order";
import Cart from "./features/cart/Cart";
import Wishlist from "./features/wishlist/Wishlist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./features/alerts/Alert";
import LoginPage from "./pages/LoginPage";
import UserRegisterForm from "./pages/UserRegisterForm";
import AddressForm from "./features/address/AddressForm";
import AddressManagement from "./features/address/AddressManagement";
import ProfilePage from "./pages/ProfilePage";


export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Alert />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/categories/:category"
            element={<ProductListingPage />}
          />
          <Route path="/productDetail/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registerUser" element={<UserRegisterForm />} />
          <Route path="/address" element={<AddressManagement />} />
          <Route path="/addressForm" element={<AddressForm />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}
