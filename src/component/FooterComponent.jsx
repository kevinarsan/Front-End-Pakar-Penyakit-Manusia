import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
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
              <Link href="/">Diagnosify Diagnosa</Link>
            </div>
            <div className="mb-1">
              <Link href="/daftar-dokter">Diagnosify GoHome</Link>
            </div>
            <div className="mb-1">
              <Link href="/daftar-dokter">Diagnosify Konsul</Link>
            </div>
          </Col>
          <Col lg="4">
            <div className="program fs-5 fw-semibold mb-2">
              Tentang Diagnosify
            </div>
            <div className="mb-1">
              <Link to="/">Tentang Kami</Link>
            </div>
            <div className="mb-1">
              <Link to="cara-penggunaan">Cara Penggunaan</Link>
            </div>
            <div className="mb-1">
              <Link to="/faq">FAQ</Link>
            </div>
          </Col>
          <Col lg="4">
            <div className="program fs-5 fw-semibold mb-2">
              Bagaimana Kami Membantu Anda?
            </div>
            <div className="mb-1">
              <Link to="/kontak-kami">Kontak Kami</Link>
            </div>
          </Col>
        </Row>
        <div className="line w-100 border-bottom border-black mb-3"></div>
        <div className="contact d-flex mb-3 d-flex justify-content-end">
          <p className="mt-1">Ikuti kami dan dapatkan info menarik!</p>
          <a href="https://www.youtube.com/@kevinarsn12_" className="ms-2">
            <img src={yt} alt="" />
          </a>
          <a
            href="https://www.instagram.com/kevinarsn_?igsh=dWtmd21mYzN5dHZh"
            className="ms-2"
          >
            <img src={ig} alt="" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100009230145954&mibextid=ZbWKwL"
            className="ms-2"
          >
            <img src={fb} alt="" />
          </a>
          <a
            href="https://www.linkedin.com/in/kevin-arsan-kamto"
            className="ms-2"
          >
            <img src={ln} alt="" />
          </a>
        </div>
        <div className="line w-100 border-bottom"></div>
      </Container>
    </div>
  );
};

export default FooterComponent;
