import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../../Services/Auth";
import img from "../../../public/logoBg.png";

function LoginPage() {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Correct form input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await loginUser(formData);
      
      if(result.success) { 
        navigate('/')
      }else{
        setErr(result.message);
      }
      
    } catch (error) {
      console.error("Login failed:", error); 
    } finally {
      setIsLoading(false);
    }
  };

  const LoginWithGoogle = () => {
    alert("Login with Google");
  };

  const LoginWithGithub = () => {
    alert("Login with Github");
  };

  return (
    <section
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center py-4">
        <div className="row d-flex justify-content-center align-items-center w-100">
          {/* Left Logo */}
          <div className="col-md-6 col-lg-5 d-none d-md-flex justify-content-center align-items-center">
            <img
              src={img}
              alt="Company Logo"
              className="img-fluid"
              style={{
                maxHeight: "300px",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Login Card */}
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary mb-2">Welcome Back</h2>
                  <p className="text-muted">
                    Sign in to your account to continue
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      id="LoginEmail"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                    <label htmlFor="LoginEmail" className="text-muted">
                      Email address
                    </label>
                  </div>

                  {/* Password Input */}
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      id="passwordId"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                    <label htmlFor="passwordId" className="text-muted">
                      Password
                    </label>
                  </div>

                  {err && (<div className="d-flex mb-4">
                    <Link
                      to="/forgot-password"
                      className="text-decoration-none text-danger"
                    >
                      {err}
                    </Link>
                  </div>
)}

                  {/* Forgot Password */}
                  <div className="d-flex justify-content-end mb-4">
                    <Link
                      to="/forgot-password"
                      className="text-decoration-none text-primary"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg py-3 fw-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Signing in...
                        </>
                      ) : (
                        "Sign in"
                      )}
                    </button>
                  </div>

                  {/* Register Link */}
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-primary text-decoration-none fw-semibold"
                      >
                        Create one here
                      </Link>
                    </p>
                  </div>
                </form>

                {/* Divider */}
                <div className="divider d-flex align-items-center my-4">
                  <div className="flex-grow-1 border-top"></div>
                  <span className="px-3 text-muted small">Or</span>
                  <div className="flex-grow-1 border-top"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="d-flex flex-column gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                    onClick={LoginWithGoogle}
                    disabled={isLoading}
                  >
                    <i className="bi bi-google me-2"></i>
                    Continue with Google
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark d-flex align-items-center justify-content-center"
                    onClick={LoginWithGithub}
                    disabled={isLoading}
                  >
                    <i className="bi bi-github me-2"></i>
                    Continue with Github
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
