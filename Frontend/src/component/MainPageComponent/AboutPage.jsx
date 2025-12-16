import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <> 
    <div className="bg-dark py-5 py-lg-5 text-center position-relative overflow-hidden">
        <div className="container position-relative z-1 py-5">
          <h1 className="display-4 fw-bold text-white mb-3">About Learn Code</h1>
          <p className="lead text-light opacity-75 mx-auto col-lg-8 fw-light">
            We are on a mission to make high-quality technical education accessible to everyone, everywhere.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <div className="d-inline-block p-2 bg-primary-subtle rounded text-primary mb-3">
                <i className="bi bi-bullseye fs-4"></i>
              </div>
              <h2 className="display-6 fw-bold text-dark mb-4">Empowering the next generation of developers</h2>
              <div className="lead text-secondary fs-6">
                <p className="mb-4">
                  Founded in 2024, Learn Code started with a simple idea: that everyone should have the opportunity to create with technology. What began as a small blog has grown into a global community.
                </p>
                <p>
                  We believe in <span className="text-dark fw-bold">learning by doing</span>. Our curriculum is designed around real-world projects, ensuring that our students don't just memorize syntax, but learn how to solve actual problems.
                </p>
              </div>
            </div>
            <div className="col-md-6">
               <div className="position-relative">
                 <img 
                   src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                   alt="Team working" 
                   className="img-fluid rounded-5 shadow-lg"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

    <div
      className="py-5"
      style={{
        background: "linear-gradient(to bottom right, #f7f9fc, #eef2ff)",
      }}
    >

      {/* What Makes Us Different */}
      <section className="mb-5 px-3 px-md-5" style={{margin: "1rem 5rem 10rem 5rem"}}>
        <h2 className="fw-bold mb-5 text-center" style={{ color: "#1c1c3c" }}>
          What Makes Us Different
        </h2>

        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-4">
            <div
              className="card h-100 p-4 rounded-4 shadow-sm border-0"
              style={{
                background: "#FFE28A",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-7px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <i className="bi bi-x-octagon-fill text-danger fs-2 mb-3"></i>
              <h5 className="fw-bold mb-2">Zero Distractions</h5>
              <p className="text-dark">
                A fast, clean platform with{" "}
                <b>no annoying ads or popups.</b>
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div
              className="card h-100 p-4 rounded-4 shadow-sm border-0"
              style={{
                background: "#FFD6C9",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-7px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <i className="bi bi-lightbulb-fill text-warning fs-2 mb-3"></i>
              <h5 className="fw-bold mb-2">Simple & Practical</h5>
              <p className="text-dark">
                Lessons are explained in plain language with real-world examples.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div
              className="card h-100 p-4 rounded-4 shadow-sm border-0"
              style={{
                background: "#fff",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-7px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <i className="bi bi-tablet-fill text-info fs-2 mb-3"></i>
              <h5 className="fw-bold mb-2">Seamless Accessibility</h5>
              <p className="text-dark">
                Enjoy a smooth experience on any device — mobile, tablet, or laptop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-3 px-md-4" style={{margin: "10rem 5rem 10rem 5rem"}}>
        <h2 className="fw-bold mb-5 text-center" style={{ color: "#1c1c3c", letterSpacing: "0.6px" }}>
          Key Features That Empower Your Learning
        </h2>

        <div className="row g-4 text-center justify-content-center">
          {/* Feature Items */}
          {[
            {
              icon: "bi-ui-checks-grid",
              title: "Topic-Wise Assessments",
              bg: "linear-gradient(135deg, #dff1ff, #bcdcff)",
              desc: "Short, structured quizzes to strengthen each concept.",
            },
            {
              icon: "bi-terminal-fill",
              title: "Hands-On Coding Practice",
              bg: "linear-gradient(135deg, #ddffe2, #b0ffc0)",
              desc: "Learn by doing with real practical code examples.",
            },
            {
              icon: "bi-patch-check-fill",
              title: "Verified Certificates",
              bg: "linear-gradient(135deg, #dff7ff, #afe4ff)",
              desc: "Build your credibility with industry-ready certificates.",
            },
            {
              icon: "bi-journal-code",
              title: "High-Quality Courses",
              bg: "linear-gradient(135deg, #fff4d3, #ffe7a4)",
              desc: "Master technologies through structured, easy lessons.",
            },
          ].map((item, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div
                className="p-4 rounded-4 shadow-sm h-100"
                style={{
                  background: item.bg,
                  transition: "0.3s",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <i className={`bi ${item.icon} fs-1 mb-3`}></i>
                <h5 className="fw-bold mb-2">{item.title}</h5>
                <p className="text-muted small">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="text-center p-5 rounded-4 shadow-lg m-5"
        style={{
          background: "linear-gradient(to right, #4C74FF, #6A5BFF)",
        }}
      >
        <h2 className="fw-bolder mb-3 text-white">Ready to Start Learning?</h2>

        <p className="lead mb-4 text-white" style={{ maxWidth: "650px", margin: "0 auto" }}>
          Join thousands of learners and start building your future with high-quality,
          practical programming courses.
        </p>

        <Link
          to={"/courses"}
          className="btn btn-lg btn-light fw-bold px-5 py-3 shadow-sm"
        >
          Browse All Courses <i className="bi bi-arrow-right-short ms-2"></i>
        </Link>
      </section>
    </div>
    </>
  );
};

export default AboutPage;
