import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import "../view/auth.css";

export default function Auth() {
  const [mode, setMode] = useState("signup");
  const { user, isLoggedIn, signup, login, logout, authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    let result;
    if (mode === "signup") {
      result = await signup(data.email, data.password);
    } else {
      result = await login(data.email, data.password);
    }

    setLoading(false);

    if (result?.success) {
      navigate("/");
    }
  };

  return React.createElement(
    "div",
    { className: "page" },
    React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "auth-container" },
        isLoggedIn && user
          ? React.createElement(
              "div",
              { className: "user-info" },
              React.createElement("h2", null, "User logged in"),
              React.createElement("p", null, `Email: ${user.email}`),
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
              React.Fragment,
              null,
              React.createElement(
                "h1",
                { className: "page-title" },
                mode === "signup" ? "Sign Up" : "Login"
              ),
              React.createElement(
                "form",
                { className: "auth-form", onSubmit: handleSubmit(onSubmit) },

                // Email
                React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                    "label",
                    { className: "form-label", htmlFor: "email" },
                    "Email"
                  ),
                  React.createElement("input", {
                    className: "form-input",
                    type: "email",
                    id: "email",
                    ...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    }),
                  }),
                  errors.email &&
                    React.createElement(
                      "p",
                      { className: "error" },
                      errors.email.message
                    )
                ),

                // Password
                React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                    "label",
                    { className: "form-label", htmlFor: "password" },
                    "Password"
                  ),
                  React.createElement("input", {
                    className: "form-input",
                    type: "password",
                    id: "password",
                    ...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 12,
                        message: "Password cannot exceed 12 characters",
                      },
                    }),
                  }),
                  errors.password &&
                    React.createElement(
                      "p",
                      { className: "error" },
                      errors.password.message
                    )
                ),

                // Confirm Password (signup mode only)
                mode === "signup" &&
                  React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                      "label",
                      { className: "form-label", htmlFor: "confirmPassword" },
                      "Confirm Password"
                    ),
                    React.createElement("input", {
                      className: "form-input",
                      type: "password",
                      id: "confirmPassword",
                      ...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      }),
                    }),
                    errors.confirmPassword &&
                      React.createElement(
                        "p",
                        { className: "error" },
                        errors.confirmPassword.message
                      )
                  ),

                authError &&
                  React.createElement("p", { className: "error" }, authError),

                React.createElement(
                  "button",
                  {
                    type: "submit",
                    className: "btn btn-primary btn-large",
                    disabled: loading,
                  },
                  loading
                    ? "Processing..."
                    : mode === "signup"
                    ? "Sign Up"
                    : "Login"
                )
              ),

              // Switch between signup/login
              React.createElement(
                "div",
                { className: "auth-switch" },
                mode === "signup"
                  ? React.createElement(
                      "p",
                      null,
                      "Already have an account? ",
                      React.createElement(
                        "span",
                        {
                          className: "auth-link",
                          onClick: () => setMode("login"),
                        },
                        "Login"
                      )
                    )
                  : React.createElement(
                      "p",
                      null,
                      "Don’t have an account? ",
                      React.createElement(
                        "span",
                        {
                          className: "auth-link",
                          onClick: () => setMode("signup"),
                        },
                        "Sign Up"
                      )
                    )
              )
            )
      )
    )
  );
}
