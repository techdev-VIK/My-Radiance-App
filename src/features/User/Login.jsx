import Header from "../../components/Header";
import Footer from "../../components/Footer";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom"


const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For showing login errors

  const navigate = useNavigate();

  useEffect(() => {
    if(errorMessage){
      const timer = setTimeout(() => {
        setErrorMessage("")
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://radiance-backend.vercel.app/admin/login",
        {
          username,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        navigate("/");
      } else {
        setErrorMessage(response.data.message || "Login failed. Please try again."); // Handle login errors
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <Header />

      <main className="container main-content mb-5">
        <div className="row justify-content-center mt-4">
          <div className="col-md-6 col-lg-5">
            <div className="card border-info shadow">
              <div className="card-body pt-0">
                <div className="text-center mb-3">
                  <img
                    src="https://placehold.co/100?text=U"
                    alt="User"
                    className="img-fluid rounded-circle"
                  />
                </div>

                <h5 className="text-center text-info mb-3">
                  Welcome Back, Please Log In
                </h5>

                {/* Error Message */}
                {errorMessage && (
                  <div className="alert alert-danger text-center p-2" role="alert">
                    {errorMessage}
                  </div>
                )}
                
                <form onSubmit={handleLogin} className="mt-4">
                  {/* Username Input */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control border-info"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={passwordToggle ? "text" : "password"}
                        id="password"
                        className="form-control border-info"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={() => setPasswordToggle(!passwordToggle)}
                      >
                        {passwordToggle ? (
                          <i className="bi bi-eye-slash-fill text-dark"></i>
                        ) : (
                          <i className="bi bi-eye-fill text-dark"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-info text-light fw-semibold"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>

              <hr className="mt-4" />

              <p className="text-center text-muted">New User?</p>
              <Link to="/pages/userForm">
              <div className="d-grid">
                <button className="btn btn-success fw-semibold">
                  Create Account
                </button>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Login;
