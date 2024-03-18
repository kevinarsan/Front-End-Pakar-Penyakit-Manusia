import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../../public/nm.png";
const LoginPages = () => {
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    navigate("/");
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
                placeholder="Contoh: johndoe@gmail.com"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="d-flex">
                <p className="mb-0 col-7">Password</p>
                <a href="" className="mx-auto">
                  Lupa Kata Sandi
                </a>
              </Form.Label>
              <Form.Control type="password" placeholder="Masukkan Password" />
            </Form.Group>

            <Nav.Link as={Link} to="/">
              <button type="submit" className="btn col-12 mt-3 fw-semibold">
                Masuk
              </button>
            </Nav.Link>

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
