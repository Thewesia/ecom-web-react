import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import "./Navbar.css"; // CSS for Navbar

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return React.createElement(
    "nav",
    { className: "navbar" },
    React.createElement(
      "div",
      { className: "navbar-container" },

      // Brand
      React.createElement(
        Link,
        { to: "/", className: "navbar-brand" },
        "ShopHub"
      ),

      // Links
      React.createElement(
        "div",
        { className: "navbar-links" },
        React.createElement(Link, { to: "/", className: "navbar-link" }, "Home"),
        React.createElement(
          Link,
          { to: "/checkout", className: "navbar-link" },
          "Cart"
        )
      ),

      // Auth Section
      React.createElement(
        "div",
        { className: "navbar-auth" },
        user
          ? React.createElement(
              "div",
              { className: "navbar-user" },
              React.createElement("span", null, `Hello, ${user.email}`),
              React.createElement(
                "button",
                {
                  className: "btn btn-secondary",
                  onClick: () => {
                    logout();
                    navigate("/auth");
                  },
                },
                "Logout"
              )
            )
          : React.createElement(
              "div",
              { className: "navbar-auth-links" },
              React.createElement(
                Link,
                { to: "/auth", className: "btn btn-secondary" },
                "Login"
              ),
              React.createElement(
                Link,
                { to: "/auth", className: "btn btn-primary" },
                "Signup"
              )
            )
      )
    )
  );
}
