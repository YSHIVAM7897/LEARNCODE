import { Link } from "react-router-dom"
import img from "../../../public/favicon.png"; 

const AppName = () => {
  return (
    <div className="d-flex align-items-center gap-2">
          <img src={img} alt="LearnCode Logo" style={{ height: "42px" }} />
          <Link className="navbar-brand fw-bold text-dark text-decoration-none fs-4" to="/">
      Learn<span className="text-primary">Code</span>
    </Link>
  
        </div>
  )
}

export default AppName;