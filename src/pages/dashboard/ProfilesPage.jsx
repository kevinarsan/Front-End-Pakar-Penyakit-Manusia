import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaRightFromBracket,
  FaGear,
  FaUserPen,
  FaCartShopping,
} from "react-icons/fa6";

const ProfilesPages = () => {
  const [selectedMenu, setSelectedMenu] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    picture: "",
    city: "",
    province: "",
    country: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/profiles/get-me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response.data;
      setProfileData(data.profile);
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    setProfilePicFile(e.target.files[0]);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    for (const key in profileData) {
      if (profileData[key]) formData.append(key, profileData[key]);
    }
    if (profilePicFile) {
      formData.append("picture", profilePicFile);
    }

    try {
      await axios.put(
        "http://localhost:5000/api/v1/profiles/update-users",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile berhasil diubah");
    } catch (error) {
      console.log("Error updating profile:", error);
      setError("Gagal mengubah profile.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok dengan password baru.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/auth/reset-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const isConfirmed = window.confirm(
        "Password berhasil diubah. Silakan logout dulu."
      );
      if (isConfirmed) {
        handleLogout();
      }
    } catch (error) {
      console.log(error);
      setError("Gagal mengubah password. Pastikan password lama benar.");
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "profile":
        return (
          <div className="col-12 d-flex justify-content-center">
            <Form className="col-12" onSubmit={handleProfileSubmit}>
              <div className="image-profile d-flex justify-content-center mt-3 position-relative">
                <img src={profileData.picture} alt="Profile" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: 0,
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <FaUserPen
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div className="mt-3">
                <div className="ms-1 mb-1">Nama</div>
                <Form.Control
                  className="fw-semibold"
                  type="text"
                  placeholder="Nama"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="mt-2">
                <div className="ms-1 mb-1">Nomor Telepon</div>
                <Form.Control
                  className="fw-semibold"
                  type="text"
                  placeholder="Nomor Telepon"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="mt-2">
                <div className="ms-1 mb-1">Negara</div>
                <Form.Control
                  className="fw-semibold"
                  type="text"
                  placeholder="Negara"
                  name="country"
                  value={profileData.country}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="mt-2">
                <div className="ms-1 mb-1">Provinsi</div>
                <Form.Control
                  className="fw-semibold"
                  type="text"
                  placeholder="Provinsi"
                  name="province"
                  value={profileData.province}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="mt-2">
                <div className="ms-1 mb-1">Kota</div>
                <Form.Control
                  className="fw-semibold"
                  type="text"
                  placeholder="Kota"
                  name="city"
                  value={profileData.city}
                  onChange={handleProfileChange}
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
            <Form className="col-12" onSubmit={handlePasswordChange}>
              <div className="mt-3">
                <div className="ms-1 mb-1">Password Lama</div>
                <Form.Control
                  type="password"
                  placeholder="Password Lama"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <div className="ms-1 mb-1">Password Baru</div>
                <Form.Control
                  type="password"
                  placeholder="Password Baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <div className="ms-1 mb-1">Konfirmasi Password Baru</div>
                <Form.Control
                  type="password"
                  placeholder="Konfirmasi Password Baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-danger mt-2">{error}</div>}
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
              <p>Riwayat Pembayaran Belum Tersedia</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
              <div class="judul mt-4 col-9 d-flex justify-content-center align-items-center">
                <p class="fs-5 text-white text-center mb-0 fw-bold">Akun</p>
              </div>
            </div>
          </Container>
        </div>
      </Row>

      <Row>
        <div className="profile">
          <Container className="d-flex justify-content-center">
            <div className="row cek col-9 d-flex">
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
