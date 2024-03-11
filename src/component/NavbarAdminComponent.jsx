import { Nav, Navbar, Form, Card, Row, Col } from "react-bootstrap";

import { NavLink, Link } from "react-router-dom";
import logo from "../../public/nm.png";
import { BiSearchAlt } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { Children } from "react";

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/daftar-penyakit", label: "Daftar Penyakit" },
  { to: "/admin/daftar-gejala", label: "Daftar Gejala" },
  { to: "/admin/daftar-aturan", label: "Daftar Aturan" },
  { to: "/admin/transaksi", label: "Transaksi" },
  { to: "/admin/laporan", label: "Laporan" },
  { to: "/admin/about", label: "About Us" },
];

const NavbarAdminComponent = ({ children }) => {
  return (
    <div>
      <Row className="admin-nav">
        <Col xs lg="2">
          <div className="mt-4 mb-4 text-center">
            <Navbar.Brand
              href="#home"
              className="brand fs-5 fw-bold text-white"
            >
              <img src={logo} alt="" className="mb-1" />
              DIAGNOSIFY
            </Navbar.Brand>
          </div>
          <Nav className="mt-5">
            {adminLinks.map((link, index) => (
              <div key={index} className="nav-link col-12 ms-2 mt-2">
                <NavLink
                  as={Link}
                  to={link.to}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  end
                >
                  {link.label}
                </NavLink>
              </div>
            ))}
          </Nav>
          <div className="logout mb-0">
            <Nav.Link
              as={Link}
              to="/admin/login-admin"
              className="text-center mt-1"
            >
              Logout
            </Nav.Link>
          </div>
        </Col>

        <Col xs lg="10">
          <div className="d-flex align-items-center mb-3">
            <div className="salam fs-2 fw-bold col-8 ms-3">Hi, Admin!</div>
            <Form className="d-flex col-3 me-5">
              <Form.Control
                type="search"
                placeholder="  Cari..."
                className="me-2 fs-6"
                aria-label="Search"
              />
              <div className="search">
                <Link to="#">
                  <BiSearchAlt className="text-white fs-4" />
                </Link>
              </div>
            </Form>
          </div>

          <div className="col-12 d-flex justify-content-center">
            <Card className="card-users-1 col-3 ms-3 me-3 rounded-4">
              <Card.Body className="d-flex align-items-center">
                <div className="me-2 ms-3 border border-white rounded-4 bg-white">
                  <BsPeople className="users fs-3 ms-2 me-2 mb-2 mt-2" />
                </div>
                <div className="ms-2">
                  <Card.Title className="fs-5 mb-0 mt-2 text-white mb-1">
                    450
                  </Card.Title>
                  <Card.Subtitle className="mb-2 fs-7 text-white fw-bold mt-1">
                    Active Users
                  </Card.Subtitle>
                </div>
              </Card.Body>
            </Card>

            <Card className="card-users-2 col-3 ms-3 me-3 rounded-4">
              <Card.Body className="d-flex align-items-center">
                <div className="me-2 ms-3 border border-white rounded-4 bg-white">
                  <BsPeople className="users fs-3 ms-2 me-2 mb-2 mt-2" />
                </div>
                <div className="ms-2">
                  <Card.Title className="fs-5 mb-0 mt-2 text-white mb-1">
                    50
                  </Card.Title>
                  <Card.Subtitle className="mb-2 fs-7 text-white fw-bold mt-1">
                    Active Doctor
                  </Card.Subtitle>
                </div>
              </Card.Body>
            </Card>

            <Card className="card-users-3 col-3 ms-3 me-3 rounded-4">
              <Card.Body className="d-flex align-items-center">
                <div className="me-2 ms-3 border border-white rounded-4 bg-white">
                  <BsPeople className="users fs-3 ms-2 me-2 mb-2 mt-2" />
                </div>
                <div className="ms-2">
                  <Card.Title className="fs-5 mb-0 mt-2 text-white mb-1">
                    10
                  </Card.Title>
                  <Card.Subtitle className="mb-2 fs-7 text-white fw-bold mt-1">
                    List Hospitals
                  </Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
          </div>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default NavbarAdminComponent;
