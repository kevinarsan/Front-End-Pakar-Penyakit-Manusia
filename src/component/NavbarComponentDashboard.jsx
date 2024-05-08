import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import logo from "../../public/nm.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";

const navLinks = [
  {
    to: "/notification",
    label: <IoMdNotificationsOutline className="fs-4 fw-bold" />,
  },
  {
    to: "/profiles",
    label: (
      <div className="me-1">
        <FiUser className="fs-4 ms-1 me-3 mb-1 fw-bold" />
        Kevinarsn_
      </div>
    ),
  },
];

const NavbarComponentDashboard = () => {
  const [changeColor, setChangeColor] = useState(false);

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

  return (
    <Navbar expand="lg" className={`${changeColor ? "color-active" : ""}`}>
      <Container>
        <Navbar.Brand
          href="/dashboard/home-page"
          className="brand fs-3 fw-bold mt-2"
        >
          <img src={logo} alt="" className="me-1 mb-1" />
          DIAGNOSIFY
        </Navbar.Brand>

        <Form className="offset-2 d-flex flex-grow-1 justify-content-center">
          <Form.Control
            size="lg"
            type="search"
            placeholder="  Cari..."
            className="search-home me-2 fs-6"
            aria-label="Search"
          />
          <div className="search">
            <Link to="#">
              <BiSearchAlt className="text-white fs-4" />
            </Link>
          </div>
        </Form>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-link ms-auto">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                as={Link}
                to={link.to}
                className="nav-link"
                activeClassName="active"
              >
                {link.label}
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponentDashboard;
