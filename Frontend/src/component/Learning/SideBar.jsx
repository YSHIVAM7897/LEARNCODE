import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ content, activeLesson, setActiveLesson }) => {
  const quickActions = ["Generate Certificate", "Back to Course"]; 
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setActiveLesson(0);
  };

  return (

    <div
      className="bg-light border-end"
      style={{ width: "280px", minHeight: "100vh" }}
    >
      <div className="p-4">
        {/* Language Section */}
        <div className="mb-4">
          <p className="m-0 text-muted">Language</p>
          <p className="fw-bold">{content.name}</p>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-muted fw-bold">📚 Modules</p>
          <div className="list-unstyled">
            {content.modules.map((module, index) => (
              
              <div key={index} className="mb-2 border rounded shadow-sm">
                {/* Module Row */}
                <Link to={`/learn/${content.slug}/${module.slug}`} className="text-decoration-none text-muted">
                <div
                  className={`w-100 px-3 py-2 d-flex align-items-center gap-2 bg-light`}
                  onClick={() => toggleDropdown(index)}
                  style={{
                    cursor: "pointer",
                    borderRadius: "6px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <span className="fw-semibold">{index + 1}.</span>
                  <span>{module.moduleTitle}</span>
                  <span className="ms-auto fw-bold">
                    {openIndex === index ? (
                      <i class="bi bi-caret-right"></i>
                    ) : (
                      <i class="bi bi-caret-down"></i>
                    )}
                  </span>
                </div>
                </Link>

                {/* Dropdown Content */}
                {openIndex === index && (
                  <ul className="list-group list-group-flush">
                    {module.topics?.map((lesson, i) => (
                      <li
                        key={i}
                        className={`list-group-item py-2 ps-4 pe-3 d-flex align-items-center`}
                        onClick={() => setActiveLesson(i)}
                        style={
                          activeLesson === i
                            ? { borderLeft: "3px solid #ec1f34ff" }
                            : { borderLeft: "3px solid #fafafaff" }
                        }
                      >
                        <Link className="text-decoration-none text-dark w-100">
                          {lesson}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 border-top pt-3">
          <p className="text-muted mb-3">Quick Actions</p>
          <ul className="list-unstyled m-0">
            {quickActions.map((action, index) => (
              <li key={index} className="m-1 fw-5">
                <Link to={`/learn/${content.slug}/assessment`} className="text-decoration-none d-block p-2 text-dark rounded hover-bg">
                  {action}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
