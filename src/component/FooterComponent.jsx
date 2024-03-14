import { Container, Row, Col } from "react-bootstrap";
import logo from "../../public/nm.png";
import fb from "../../public/FB.png";
import yt from "../../public/yt.png";
import ig from "../../public/ig.png";
import ln from "../../public/ln.png";

const FooterComponent = () => {
  return (
    <div className="footer w-100">
      <Container>
        <Row className="mb-3">
          <Col className="mt-3 d-flex align-items-center">
            <img src={logo} alt="logo-img" />
            <div className="logo fs-3 fw-bold ms-1">DIAGNOSIFY</div>
          </Col>
        </Row>

        <Row className="mb-2">
          <Col lg="4">
            <div className="program fs-5 fw-semibold mb-2">
              Program Diagnosify
            </div>
            <div className="mb-1">
              <a href="#">Diagnosify Diagnosa</a>
            </div>
            <div className="mb-1">
              <a href="#">Diagnosify GoHome</a>
            </div>
            <div className="mb-1">
              <a href="#">Diagnosify Konsul</a>
            </div>
          </Col>
          <Col lg="4">
            <div className="program fs-5 fw-semibold mb-2">
              Tentang Diagnosify
            </div>
            <div className="mb-1">
              <a href="#">Tentang Kami</a>
            </div>
            <div className="mb-1">
              <a href="#">Cara Penggunaan</a>
            </div>
            <div className="mb-1">
              <a href="#">FAQ</a>
            </div>
          </Col>
          <Col lg="4">
            <div className="program fs-5 fw-semibold mb-2">
              Bagaimana Kami Membantu Anda?
            </div>
            <div className="mb-1">
              <a href="#">Kontak Kami</a>
            </div>
          </Col>
        </Row>
        <div className="line w-100 border-bottom border-black mb-3"></div>
        <div className="contact d-flex mb-3 d-flex justify-content-end">
          <p className="mt-1">Ikuti kami dan dapatkan info menarik!</p>
          <a href="" className="ms-2">
            <img src={yt} alt="" />
          </a>
          <a href="" className="ms-2">
            <img src={ig} alt="" />
          </a>
          <a href="" className="ms-2">
            <img src={fb} alt="" />
          </a>
          <a href="" className="ms-2">
            <img src={ln} alt="" />
          </a>
        </div>
        <div className="line w-100 border-bottom"></div>
      </Container>
    </div>
  );
};

export default FooterComponent;
