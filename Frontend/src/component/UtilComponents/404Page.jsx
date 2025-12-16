import { Link } from "react-router-dom";
import logo from "../../../public/logoBg.png"

const PageNotFound = () => {
  return(
    <div className="p-5 d-flex align-items-center flex-column vh-100 justify-content-center bg-light">
      <img src={logo} style={{maxWidth:'15rem', float:'right', borderRadius:'500rem'}}/>
      <h1 className="fw-light text-secondary mt-4">404 Page not found!</h1>
      <Link className="text-primary text-decoration-none fs-10" to='/'><p>redirect to dashboard {"->"}</p></Link>
    </div>
  );
}

export default PageNotFound;