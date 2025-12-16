import React from "react";
import { Link } from "react-router-dom";

const LangCard = ({ lang }) => {
  return (
    <div className="col-md-6 col-lg-3 ">
      <div className="card h-100 p-4 border rounded-4 shadow-soft shadow-hover position-relative overflow-hidden">
        <div className="position-absolute top-0 end-0 p-5 bg-primary-subtle rounded-circle translate-middle-y me-n4 mt-n4 opacity-25"></div>

        <h3 className="h4 fw-bold text-dark mb-3 position-relative z-1">
          {lang.name}
        </h3>
        <p className="text-secondary small mb-4 flex-grow-1 position-relative z-1">
          {lang.description}
        </p>
        <Link
          to={`/learn/${lang.slug}`}
          className="btn btn-dark rounded-4 px-4 py-2 w-auto align-self-start position-relative z-1 d-inline-flex align-items-center gap-2"
        >
          Start {lang.name}
          <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default LangCard;
