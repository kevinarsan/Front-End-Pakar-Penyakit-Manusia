import { Container, Row, Col, Nav, Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../public/p3k.png";
import stunting from "../../public/conten.jpg";
import mental from "../../public/mental.jpg";
import { render } from "react-dom";

const DiagnosaPage = () => {
  const [motoData, setMotoData] = useState([]);
  const [activeTab, setActiveTab] = useState("resiko-penyakit");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMoto = await axios.get(
          "http://localhost:5000/api/v1/about/description-team"
        );

        const motoItems = responseMoto.data.about.filter(
          (item) => item.name === "Diagnosa"
        );
        setMotoData(motoItems);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const renderContent = () => {
    if (activeTab === "resiko-penyakit") {
      return (
        <>
          <div>
            <div className="-d-flex">
              <Row>
                <Col lg="4">
                  <div className="card-diagnosa d-flex align-items-center mb-3">
                    <div className="me-3 mt-2 mb-2 ms-2">
                      <img src={stunting} alt="" />
                    </div>
                    <div className="mt-2">
                      <h5 className="fw-semibold">Deteksi Dini Stunting</h5>
                    </div>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="card-diagnosa d-flex align-items-center mb-3">
                    <div className="me-3 mt-2 mb-2 ms-2">
                      <img src={stunting} alt="" />
                    </div>
                    <div className="mt-2">
                      <h5 className="fw-semibold">
                        Deteksi Dini Ejakulasi Dini
                      </h5>
                    </div>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="card-diagnosa d-flex align-items-center mb-3">
                    <div className="me-3 mt-2 mb-2 ms-2">
                      <img src={stunting} alt="" />
                    </div>
                    <div className="mt-2">
                      <h5 className="fw-semibold">Deteksi Dini Stunting</h5>
                    </div>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="card-diagnosa d-flex align-items-center mb-3">
                    <div className="me-3 mt-2 mb-2 ms-2">
                      <img src={stunting} alt="" />
                    </div>
                    <div className="mt-2">
                      <h5 className="fw-semibold">Deteksi Dini Stunting</h5>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </>
      );
    } else if (activeTab === "mental") {
      return (
        <>
          <div>
            <div className="-d-flex">
              <Row>
                <Col lg="4">
                  <div className="card-diagnosa d-flex align-items-center mb-3">
                    <div className="me-3 mt-2 mb-2 ms-2">
                      <img src={mental} alt="" />
                    </div>
                    <div className="mt-2">
                      <h5 className="fw-semibold">Deteksi Dini Mental</h5>
                    </div>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="card-diagnosa d-flex align-items-center mb-3">
                    <div className="me-3 mt-2 mb-2 ms-2">
                      <img src={mental} alt="" />
                    </div>
                    <div className="mt-2">
                      <h5 className="fw-semibold">Deteksi Dini Mental</h5>
                    </div>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="card-diagnosa d-flex align-items-center mb-3">
                    <div className="me-3 mt-2 mb-2 ms-2">
                      <img src={mental} alt="" />
                    </div>
                    <div className="mt-2">
                      <h5 className="fw-semibold">Deteksi Dini Mental</h5>
                    </div>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="card-diagnosa d-flex align-items-center mb-3">
                    <div className="me-3 mt-2 mb-2 ms-2">
                      <img src={mental} alt="" />
                    </div>
                    <div className="mt-2">
                      <h5 className="fw-semibold">Deteksi Dini Mental</h5>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <div className="diagnosa">
      <div className="wp d-flex justify-content-center">
        <Row className="mb-3 col-8">
          <Col lg="8">
            {motoData.map((item) => (
              <div key={item} className="mt-4">
                <h1 className="text-start">{item.name}</h1>
                <div className="col-11 d-flex justify-content-center mt-1">
                  <p className="text-start fs-5">{item.description}</p>
                </div>
              </div>
            ))}
          </Col>
          <Col lg="4">
            <div>
              <img src={logo} alt="p3k" />
            </div>
          </Col>
        </Row>
      </div>
      <Container>
        <Row>
          <div className="mt-5">
            <h4 className="fw-bold ">Alat Diagnosa Gratis</h4>
          </div>
          <div>
            <div className="nav-diagnosa mb-5">
              <Nav variant="underline" defaultActiveKey="/home">
                <Nav.Item className="me-2">
                  <Nav.Link
                    className={`fw-bold fs-5 ${
                      activeTab === "resiko-penyakit" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("resiko-penyakit")}
                  >
                    Resiko Penyakit
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="ms-2">
                  <Nav.Link
                    className={`fw-bold fs-5 ${
                      activeTab === "mental" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("mental")}
                  >
                    Mental
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            {renderContent()}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default DiagnosaPage;
