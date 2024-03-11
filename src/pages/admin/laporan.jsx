import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from "react";
import { Navbar, Container, Row } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import logo from "../../../public/nm.png";

function NavbarAdmin() {
  return (
    <Nav className="nav-admin flex-column col-2">
      <Container>
        <Navbar.Brand
          href="#home"
          className="brand fs-5 fw-bold mt-5 d-flex justify-content-center text-white mb-5"
        >
          <img src={logo} alt="" className="me-2" />
          DIAGNOSIFY
        </Navbar.Brand>

        <Nav.Item defaultActiveKey="/home" className="ms-4">
          <Nav.Link
            as={Link}
            to="/admin/dashboard"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/daftar-dokter"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            Daftar Dokter
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/daftar-hopitals"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            Daftar Hospital
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/daftar-users"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            Daftar User
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/daftar-penyakit"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            Daftar Penyakit
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/daftar-gejala"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            Daftar Gejala
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/daftar-aturan"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            Daftar Aturan
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/pembayaran"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            Pembayaran
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/laporan"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            Laporan
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/about"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            About
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/laporan"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            Laporan
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/keluar"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            end
          >
            Keluar
          </Nav.Link>
        </Nav.Item>
      </Container>
    </Nav>
  );
}

export default NavbarAdmin;
