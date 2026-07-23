import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/Auth";
import Chekout from "./pages/chekout";
import Navbar from "./components/navbar";
import "./App.css";
import { AuthProvider } from "./context/authcontext";
import { CartProvider } from "./context/cartcontext";
import ProductDetail from "./pages/productdetail";

function App() {
  return React.createElement(
    AuthProvider,
    null,
    React.createElement(
      CartProvider,
      null,
      React.createElement(
        "div",
        { className: "app" },
        React.createElement(Navbar),
        React.createElement(
          Routes,
          null,
          React.createElement(Route, {
            path: "/",
            element: React.createElement(Home),
          }),
          React.createElement(Route, {
            path: "/auth",
            element: React.createElement(Auth),
          }),
          React.createElement(Route, {
            path: "/checkout",
            element: React.createElement(Chekout),
          }),
          React.createElement(Route, {
            path: "/products/:id",
            element: React.createElement(ProductDetail),
          })
        )
      )
    )
  );
}

export default App;
