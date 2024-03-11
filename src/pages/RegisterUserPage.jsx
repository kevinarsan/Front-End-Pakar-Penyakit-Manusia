import { Col, Container, Row, Form } from "react-bootstrap";
import logo from "../../public/nm.png";
import { useNavigate } from "react-router-dom";

const RegisterUserPage = () => {
  const navigate = useNavigate();
  return (
    <div className="login w-100">
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Form className="col-8">
            <h3 className="fw-semibold">Daftar</h3>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Contoh: johndoe@gmail.com"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control type="text" placeholder="+62" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="d-flex">Password</Form.Label>
              <Form.Control type="password" placeholder="Masukkan Password" />
            </Form.Group>

            <button type="submit" className="btn col-12 mt-3 fw-semibold">
              Masuk
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
