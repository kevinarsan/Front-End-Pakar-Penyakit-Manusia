import { Row, Col, Form, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/nm.png";

const LoginAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="login-admin w-100 overflow-hidden">
      <Row>
        <Col className="col-5 d-flex justify-content-center align-items-center">
          <img src={logo} alt="" className="mb-1" />
          <h1 className="fw-bold text-white ms-2">DIAGNOSIFY</h1>
        </Col>

        <Col className="col-7 d-flex justify-content-center align-items-center">
          <Form className="col-7">
            <h3 className="text-center mb-5">Login</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ID Admin</Form.Label>
              <Form.Control type="email" placeholder="ID Admin" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="d-flex">
                <p className="mb-0 col-7">Password</p>
                <a href="" className="mx-auto fw-semibold">
                  Lupa Kata Sandi
                </a>
              </Form.Label>
              <Form.Control type="password" placeholder="Masukkan Password" />
            </Form.Group>

            <Nav.Link as={Link} to="/admin/dashboard">
              <button type="submit" className="btn col-12 mt-3 fw-semibold">
                Masuk
              </button>
            </Nav.Link>

            {/* <div className="d-flex justify-content-center mt-5 fw-semibold">
              Belum Punya Akun
              <a
                className="ms-1"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/register-user")}
              >
                Daftar Disini
              </a>
            </div> */}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default LoginAdmin;
