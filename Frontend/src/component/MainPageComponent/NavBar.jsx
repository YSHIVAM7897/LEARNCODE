import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // 1. Import useLocation
import { logout, isUserLoggedIn } from "../../../Services/Auth";
import AppName from "../UtilComponents/AppName";
import useIsDesktop from "../../../CostumeHooks/useIsDesktop";
import { Image, NavDropdown, Button, Container, Navbar, Nav,} from "react-bootstrap";
import styles from "./NavBar.module.css"; 

function NavBar() {
  const navItems = ["Courses", "About", "Contact"];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  // 2. Get current location
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      const data = await isUserLoggedIn();
      setIsLoggedIn(data.success); 
      sessionStorage.setItem("isLoggedIn", data.success); 
      
      if(data.success){
      setUserName(data.userDetails.firstName);
      setUserId(data.userDetails.userId);
    }
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.ok) {
        navigate("/login");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-white py-3 sticky-top shadow-sm font-monospace"
      >
        <Container fluid className="px-4">
          <div className="d-flex align-items-center">
            <AppName />
          </div>

          {isDesktop && (
            <Nav className="mx-auto d-flex flex-row gap-4">
              {navItems.map((item, index) => {
                const route = `/${item.replace(/\s+/g, "").toLowerCase()}`;

                // 4. Check if this is the current page
                const isActive = location.pathname === route;

                return (
                  <Nav.Item key={index}>
                    <Link
                      to={route}
                      // 5. Conditionally apply classes based on isActive
                      className={`nav-link px-3 py-2 rounded ${
                        styles.customNavLink
                      } fw-bold ${
                        isActive ? styles["active-link"] : "text-secondary"
                      }`}
                    >
                      {item.toUpperCase()}
                    </Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          )}

          <div className="d-flex align-items-center gap-3">
            {isLoggedIn ? (
              <NavDropdown
                align="end"
                className={styles.hideArrow}
                title={
                  <div className="d-flex align-items-center gap-2 border rounded-pill pe-3 p-1 hover-shadow transition">
                    <Image
                      src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Gamer"
                      roundedCircle
                      width="35"
                      height="35"
                      className="border border-2 border-light shadow-sm bg-light"
                      alt="User"
                    />
                    <span className="small fw-bold text-dark">{userName}</span>
                  </div>
                }
                id="profile-dropdown"
              >
                <NavDropdown.Item onClick={(() => navigate(`/profile/${userId}`))}>
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={(() => navigate(`/${userId}/certificates`))}>
                  Certificates
                </NavDropdown.Item>
                <NavDropdown.Item onClick={(() => navigate(`/${userId}/settings`))}>Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login">
                <Button
                  className={`${styles.login} rounded-pill px-4 fw-bold shadow-sm`}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
