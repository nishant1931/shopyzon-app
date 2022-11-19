import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import HomeScreen from "./Screens/HomeScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import { useSelector } from "react-redux";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import UserListsScreen from "./Screens/UserListsScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import ProductListsScreen from "./Screens/ProductListsScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import OrderListScreen from "./Screens/OrderListScreen";
import ScrollToTop from "./components/ScrollToTop";
import { useState } from "react";
import NotFound from "./Screens/NotFound";

const App = () => {
  const [keyword, setKeyword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Router>
      <Header setKeyword={setKeyword} />
      <main className="my-3">
        <Container>
          <ScrollToTop>
            <Routes>
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/cart/:id" element={<CartScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route
                path="/register"
                element={userInfo ? <Navigate to="/" /> : <RegisterScreen />}
              />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/admin/userlists" element={<UserListsScreen />} />
              <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
              <Route
                path="/admin/product/:id/edit"
                element={<ProductEditScreen />}
              />
              <Route
                path="/admin/productlists/"
                element={<ProductListsScreen />}
                exact
              />
              <Route
                path="/admin/productlists/:pageNumber"
                element={<ProductListsScreen />}
                exact
              />
              <Route path="/admin/orderlists/" element={<OrderListScreen />} />
              <Route
                path="/"
                exact
                element={<HomeScreen keyword={keyword} />}
              />
              <Route
                path="/page/:pageNumber"
                element={<HomeScreen keyword={keyword} exact />}
              />
              <Route path="/search/:keyword" element={<HomeScreen />} exact />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ScrollToTop>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
