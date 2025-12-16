import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className=" border-top py-5 bg-light">
      <div className="container"> 
        <div className="row mb-4"> 
          <div className="col-lg-4 mb-4 mb-lg-0">
            <Link to="/" className="text-decoration-none">
              <h5 className="text-dark mb-3">LearnCode</h5>
            </Link>
            <p className="text-muted small">
              Tutorials and quizzes for React, Node.js, Python, Java, and C++—built to help you master concepts through
              concise lessons and hands-on practice.
            </p>
          </div>

          {/* Links Sections */}
          <div className="col-lg-8">
            <div className="row">
              {/* Platform Links */}
              <div className="col-sm-4 mb-4 mb-sm-0">
                <h6 className="text-dark mb-3">Platform</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="/courses" className="text-muted text-decoration-none hover-underline">
                      Courses
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/learn/react" className="text-muted text-decoration-none hover-underline">
                      React Track
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/learn/node-js" className="text-muted text-decoration-none hover-underline">
                      Node.js Track
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div className="col-sm-4 mb-4 mb-sm-0">
                <h6 className="text-dark mb-3">Company</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="/about" className="text-muted text-decoration-none hover-underline">
                      About
                    </Link>
                  </li>
                  <li className="mb-2">
                    <a href="mailto:hello@learncode.dev" className="text-muted text-decoration-none hover-underline">
                      Contact
                    </a>
                  </li>
                  <li className="mb-2">
                    <Link to="/privacy" className="text-muted text-decoration-none hover-underline">
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources Links */}
              <div className="col-sm-4">
                <h6 className="text-dark mb-3">Resources</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="/blog" className="text-muted text-decoration-none hover-underline">
                      Blog
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/faq" className="text-muted text-decoration-none hover-underline">
                      FAQ
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/support" className="text-muted text-decoration-none hover-underline">
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-top pt-4">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <small className="text-muted">
                © {new Date().getFullYear()} LearnCode. All rights reserved.
              </small>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <small className="text-muted">
                Made for self-paced, practical programming education.
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;