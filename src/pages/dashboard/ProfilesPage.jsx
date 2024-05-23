import React, { useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import {
  FaArrowLeft,
  FaRightFromBracket,
  FaGear,
  FaUserPen,
  FaCartShopping,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import img from "../../../public/kevin.jpg";

const ProfilesPages = () => {
  const [selectedMenu, setSelectedMenu] = useState("profile");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "profile":
        return (
          <div className="col-12 d-flex justify-content-center">
            <Form className="col-12">
              <div className="image-profile d-flex justify-content-center mt-3">
                <img src={img} alt="" />
              </div>
              <div className="mt-3">
                <div className="ms-1 mb-1">Nama</div>
                <Form.Control
                  className="fw-semibold"
                  type="text"
                  placeholder="Kevin Arsan Kamto"
                />
              </div>
              <div className="mt-2">
                <div className="ms-1 mb-1">Nomor Telepon</div>
                <Form.Control
                  className="fw-semibold"
                  type="text"
                  placeholder="+62 81218187958"
                />
              </div>
              <div className="mt-2">
                <div className="ms-1 mb-1">Negara</div>
                <Form.Control
                  className="fw-semibold"
                  type="text"
                  placeholder="Indonesia"
                />
              </div>
              <div className="mt-2">
                <div className="ms-1 mb-1">Provinsi</div>
                <Form.Control
                  className="fw-semibold"
                  type="text"
                  placeholder="Jawa Timur"
                />
              </div>
              <div className="mt-2">
                <div className="ms-1 mb-1">Kota</div>
                <Form.Control
                  className="fw-semibold"
                  type="text"
                  placeholder="Blitar"
                />
              </div>
              <Button
                className="col-12 save-home mb-4 fw-bold mt-3"
                type="submit"
              >
                Simpan Profile Saya
              </Button>
            </Form>
          </div>
        );
      case "password":
        return (
          <div className="col-12 d-flex justify-content-center">
            <Form className="col-12">
              <div className="mt-3">
                <div className="ms-1 mb-1">Password Lama</div>
                <Form.Control
                  className="fw-semibold"
                  type="password"
                  placeholder="Password Lama"
                />
              </div>
              <div className="mt-3">
                <div className="ms-1 mb-1">Password Baru</div>
                <Form.Control
                  className="fw-semibold"
                  type="password"
                  placeholder="Password Baru"
                />
              </div>
              <div className="mt-3">
                <div className="ms-1 mb-1">Konfirmasi Password Baru</div>
                <Form.Control
                  className="fw-semibold"
                  type="password"
                  placeholder="Konfirmasi Password Baru"
                />
              </div>
              <Button
                className="col-12 save-home mb-4 fw-bold mt-3"
                type="submit"
              >
                Ubah Password
              </Button>
            </Form>
          </div>
        );
      case "riwayat":
        return (
          <div className="col-12 d-flex justify-content-center">
            <div className="col-12">
              <h5>Riwayat</h5>
              <p>Content for riwayat goes here...</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="notification w-100 overflow-hidden">
      <Row className="wp justify-content-center">
        <div>
          <Container>
            <div className="d-flex justify-content-center mt-4">
              <a
                href="/dashboard/home-page"
                className="col-10 fs-6 fw-semibold"
              >
                <FaArrowLeft className="me-3 mb-1 fs-5" />
                Kembali Ke Beranda
              </a>
            </div>
            <div className="d-flex mt-3 justify-content-center">
              <div className="judul mt-4 col-9 d-flex justify-content-center align-items-center">
                <p className="fs-5 text-white text-center mb-0 fw-bold">Akun</p>
              </div>
            </div>
          </Container>
        </div>
      </Row>

      <Row>
        <div className="profile">
          <Container className="d-flex justify-content-center">
            <div className="row cek col-9 d-flex">
              {/* NAVBAR PROFILE */}
              <Col lg="6">
                <div className="mt-2">
                  <div
                    className={`menu ms-2 col-8 d-flex align-items-center ${
                      selectedMenu === "profile" ? "active" : ""
                    }`}
                    onClick={() => setSelectedMenu("profile")}
                  >
                    <p className="mb-3 mt-3 col-12">
                      <FaUserPen className="me-3 fs-4 mb-1" />
                      Profile Saya
                    </p>
                  </div>
                  <div
                    className={`menu ms-2 col-8 d-flex align-items-center ${
                      selectedMenu === "password" ? "active" : ""
                    }`}
                    onClick={() => setSelectedMenu("password")}
                  >
                    <p className="mb-3 mt-3 col-12">
                      <FaGear className="me-3 fs-4 mb-1" />
                      Ubah Password
                    </p>
                  </div>
                  <div
                    className={`menu ms-2 col-8 d-flex align-items-center ${
                      selectedMenu === "riwayat" ? "active" : ""
                    }`}
                    onClick={() => setSelectedMenu("riwayat")}
                  >
                    <p className="mb-3 mt-3 col-12">
                      <FaCartShopping className="me-3 fs-4 mb-1" /> Riwayat
                    </p>
                  </div>
                  <div
                    className="menu ms-2 col-8 d-flex align-items-center"
                    onClick={handleLogout}
                  >
                    <p className="mb-3 mt-3 col-12">
                      <FaRightFromBracket className="me-3 fs-4 mb-1" /> Keluar
                    </p>
                  </div>
                </div>
              </Col>
              {/* NAVBAR PROFILE */}

              <Col lg="6" className="mb-4">
                <div className="content col-10">{renderContent()}</div>
              </Col>
            </div>
          </Container>
        </div>
      </Row>
    </div>
  );
};

export default ProfilesPages;
