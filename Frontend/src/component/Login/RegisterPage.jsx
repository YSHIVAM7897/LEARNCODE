import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from '../../../Services/Auth';  
import img from '../../../public/logo.png';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({firstName: "",  lastName: "",  email: "",  password: "",  confirmPassword: "",  agreeToTerms: false});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    if (!formData.password) errs.password = "Password is required";
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!formData.agreeToTerms) errs.agreeToTerms = "You must agree to the terms";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setIsLoading(true);
    try {
      const result = await registerUser(formData);
      if (result.success) { 
        sessionStorage.setItem("email", formData.email); 
        navigate('/verify-otp');
      } else {
        console.log(result)
        setErrors({ submit: result.message });
      }
    } catch (error) { 
      sessionStorage.setItem("email", formData.email); 
      navigate('/verify-otp')
      setErrors({ submit: error.message || 'Network error' });
    } finally {
      setIsLoading(false);
    }
  };

  const RegisterWithGoogle = () => { 
    alert("Register with google"); 
  };

  const RegisterWithGithub = () => { 
    alert("Register with github");
  };

  return ( 
      <section className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center py-4">
          <div className="row d-flex justify-content-center align-items-center w-100">
            <div className="col-12 text-center mb-4">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={img}
                  alt="Company Logo"
                  className="img-fluid"
                  style={{ maxHeight: '80px', maxWidth: '200px', objectFit: 'contain' }}
                />
              </div>
            </div>

            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary mb-2">Create Account</h2>
                    <p className="text-muted">Sign up to get started with your account</p>
                  </div>

                  <div className="d-grid gap-2 mb-4">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-lg d-flex align-items-center justify-content-center"
                      onClick={RegisterWithGoogle}
                      disabled={isLoading}
                    >
                      <i className="bi bi-google me-2"></i>
                      Sign up with Google
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-dark btn-lg d-flex align-items-center justify-content-center"
                      onClick={RegisterWithGithub}
                      disabled={isLoading}
                    >
                      <i className="bi bi-github me-2"></i>
                      Sign up with GitHub
                    </button>
                  </div>

                  <div className="divider d-flex align-items-center my-4">
                    <div className="flex-grow-1 border-top"></div>
                    <span className="px-3 text-muted small">Or sign up with email</span>
                    <div className="flex-grow-1 border-top"></div>
                  </div>

                  <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">First name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">Last name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className={`form-check-input ${errors.agreeToTerms ? 'is-invalid' : ''}`}
                          type="checkbox"
                          id="agreeToTerms"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="agreeToTerms">
                          Agree to terms and conditions
                        </label>
                        {errors.agreeToTerms && <div className="invalid-feedback d-block">{errors.agreeToTerms}</div>}
                      </div>
                    </div>

                    {errors.submit && (
                      <div className="col-12">
                        <div className="alert alert-danger py-2">{errors.submit}</div>
                      </div>
                    )}

                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Create account'}
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default RegisterPage;