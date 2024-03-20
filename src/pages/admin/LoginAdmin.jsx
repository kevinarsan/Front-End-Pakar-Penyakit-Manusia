// Login.jsx
import { Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import logo from "../../../public/nm.png";

const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah perilaku default dari form submit

    if (!formData.username || !formData.password) {
      setError("ID Admin & Password wajib diisi!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        formData
      );

      const token = response.data.data.token;
      const role = response.data.data.user.role;

      // Menyimpan token ke local storage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Redirect pengguna ke halaman dashboard sesuai dengan role
      if (role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (role === "dokter") {
        window.location.href = "/dokter/dashboard";
      } else {
        setError("Maaf, anda tidak punya akses masuk");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("Maaf, kata sandi salah");
      } else if (error.response && error.response.status === 401) {
        setError("ID Admin tidak terdaftar!");
      } else {
        console.error("Error during login", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  return (
    <div className="login-admin w-100 overflow-hidden">
      <Row>
        <Col className="col-5 d-flex justify-content-center align-items-center">
          <img src={logo} alt="" className="mb-1" />
          <h1 className="fw-bold text-white ms-2">DIAGNOSIFY</h1>
        </Col>

        <Col className="col-7 d-flex justify-content-center align-items-center">
          <Form className="col-7" onSubmit={handleLogin}>
            <h3 className="text-center mb-5">Login</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ID Admin</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="ID Admin (username)"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="d-flex">
                <p className="mb-0 col-7">Password</p>
                <a href="" className="mx-auto fw-semibold">
                  Lupa Kata Sandi
                </a>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <button type="submit" className="btn col-12 mt-3 fw-semibold">
              Masuk
            </button>

            <div className="d-flex justify-content-center mt-3">
              {error && (
                <p className="alert-error col-8 d-flex justify-content-center align-items-center">
                  {error}
                </p>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default LoginAdmin;
