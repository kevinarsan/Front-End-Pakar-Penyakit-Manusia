import { Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import logo from "../../public/nm.png";
import { useState } from "react";

const LoginPages = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Email dan password harus diisi");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.data.token);
      navigate("/dashboard/home-page");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("Maaf, kata sandi salah");
      } else if (error.response && error.response.status === 401) {
        setError("Email tidak terdaftar!");
      } else {
        console.error("Error during login", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    navigate("/dashboard/home-page");
  };

  const handleGoogleLoginError = () => {
    console.log("Login Gagal");
  };

  return (
    <div className="login w-100 overflow-hidden">
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Form className="col-8">
            <h3 className="fw-semibold">Masuk</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email / No Telepon</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Contoh: johndoe@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="d-flex">
                <p className="mb-0 col-7">Password</p>
                <a href="" className="mx-auto">
                  Lupa Kata Sandi
                </a>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Masukkan Password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <button
              type="button"
              className="btn col-12 mt-3 fw-semibold"
              onClick={handleLogin}
            >
              Masuk
            </button>

            <div className="d-flex justify-content-center mt-5">
              Belum Punya Akun
              <a
                className="ms-1"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/register-user")}
              >
                Daftar Disini
              </a>
            </div>

            <div className="d-flex justify-content-center mt-3">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
            </div>

            <div className="d-flex justify-content-center">
              {error && (
                <p className="alert-error col-8 mt-4 d-flex justify-content-center align-items-center">
                  {error}
                </p>
              )}
            </div>
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

export default LoginPages;
