import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext"; 
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

export default function Auth() {
  const [mode, setMode] = useState("signup");
  const { user, isLoggedIn, signup, login, logout, authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ initialize navigate

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

    // ✅ If login/signup successful, redirect to home
    if (result?.success) {
      navigate("/"); 
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {isLoggedIn && user ? (
            <div className="user-info">
              <h2>User logged in</h2>
              <p>Email: {user.email}</p>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  logout();
                  navigate("/auth"); // ✅ redirect to auth page after logout
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <h1 className="page-title">
                {mode === "signup" ? "Sign Up" : "Login"}
              </h1>

              <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="form-group">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input
                    className="form-input"
                    type="password"
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 12,
                        message: "Password cannot exceed 12 characters",
                      },
                    })}
                  />
                  {errors.password && <p className="error">{errors.password.message}</p>}
                </div>

                {/* Confirm Password (only in signup mode) */}
                {mode === "signup" && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      className="form-input"
                      type="password"
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === watch("password") || "Passwords do not match",
                      })}
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                  </div>
                )}

                {/* Auth error from context */}
                {authError && <p className="error">{authError}</p>}

                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : mode === "signup"
                    ? "Sign Up"
                    : "Login"}
                </button>
              </form>

              {/* Switch between signup/login */}
              <div className="auth-switch">
                {mode === "signup" ? (
                  <p>
                    Already have an account?{" "}
                    <span
                      className="auth-link"
                      onClick={() => setMode("login")}
                    >
                      Login
                    </span>
                  </p>
                ) : (
                  <p>
                    Don’t have an account?{" "}
                    <span
                      className="auth-link"
                      onClick={() => setMode("signup")}
                    >
                      Sign Up
                    </span>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
