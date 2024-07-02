import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import logo from "../../public/nm.png";
import { FaArrowRightToBracket } from "react-icons/fa6";
import axios from "axios"; // Import axios for making API calls

const navLinks = [
  { to: "/", label: "Tentang Kami" },
  { to: "/daftar-dokter", label: "Daftar Dokter" },
  { to: "/diagnosa", label: "Diagnosa" },
  { to: "/cara-penggunaan", label: "Cara Penggunaan" },
  { to: "/faq", label: "FAQ" },
];

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);
  const [username, setUsername] = useState(null);

  const changeBackgoundColor = () => {
    if (window.scrollY > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    changeBackgoundColor();
    window.addEventListener("scroll", changeBackgoundColor);
    return () => {
      window.removeEventListener("scroll", changeBackgoundColor);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "https://api-penyakit-manusia.up.railway.app/api/v1/auth/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsername(response.data.me.username);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Navbar expand="lg" className={changeColor ? "color-active" : ""}>
        <Container>
          <Navbar.Brand href="#home" className="brand fs-3 fw-bold mt-2">
            <img src={logo} alt="" className="me-1 mb-1" />
            DIAGNOSIFY
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-link mx-auto text-center">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  as={Link}
                  to={link.to}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  end
                >
                  {link.label}
                </NavLink>
              ))}
            </Nav>

            <div className="text-center">
              {username ? (
                <Nav.Link as={Link} to="/dashboard/profiles">
                  {username}
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaArrowRightToBracket className="me-2" />
                  Masuk
                </Nav.Link>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
