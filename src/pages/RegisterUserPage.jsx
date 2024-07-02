import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../../public/nm.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterUserPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register-users",
        {
          username,
          email,
          phone,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Register Berhasil");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status) {
        switch (error.response.status) {
          case 400:
            setError("Email is already taken");
            break;
          case 401:
            setError("Username is already taken");
            break;
          case 402:
            setError("Phone number is already taken");
            break;
          default:
            setError("Terjadi kesalahan saat mendaftar.");
        }
      } else {
        setError("Terjadi kesalahan saat mendaftar.");
      }
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    navigate("/");
  };

  const handleGoogleLoginError = () => {
    console.log("Register Gagal");
  };

  return (
    <div className="login w-100 overflow-hidden">
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Form className="col-8" onSubmit={handleRegister}>
            <h3 className="fw-semibold">Daftar Akun</h3>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Contoh: johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control
                type="text"
                placeholder="+62"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="d-flex">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <button type="submit" className="btn col-12 mt-3 fw-semibold">
              Daftar
            </button>
            <div className="d-flex justify-content-center mt-5">
              Sudah Punya Akun
              <a
                className="ms-1"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Masuk Disini
              </a>
            </div>

            <div className="d-flex justify-content-center mt-3">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
            </div>
            {error && (
              <div className="d-flex justify-content-center col-12">
                <div className="alert-error col-8 mt-4 d-flex justify-content-center align-items-center">
                  {error}
                </div>
              </div>
            )}
          </Form>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <img src={logo} alt="" className="mb-1" />
          <h1 className="fw-bold text-white ms-2">DIAGNOSIFY</h1>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterUserPage;
