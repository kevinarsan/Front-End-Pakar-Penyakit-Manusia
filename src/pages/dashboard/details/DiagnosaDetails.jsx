import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  FaCircle,
  FaCircleExclamation,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa6";
import logo from "../../../../public/conten.jpg";

const DiagnosaDetails = () => {
  const { id } = useParams();
  const [disease, setDisease] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/diseases/get/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.disease) {
          setDisease(data.disease);
        }
      })
      .catch((error) => {
        console.error("Error fetching disease:", error);
      });
  }, [id]);

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const handleCloseModal1 = () => setShowModal1(false);
  const handleShowModal1 = () => setShowModal1(true);

  const handleCloseModal2 = () => {
    setShowModal2(false);
    handleShowModal1(); // Show modal-1 after closing modal-2
  };
  const handleShowModal2 = () => setShowModal2(true);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Data yang disubmit:", formData);
    handleCloseModal1();
    handleShowModal2(); // Show modal-2 after closing modal-1
  };

  return (
    <div className="home-detail w-100 overflow-hidden">
      <Row className="mb-5">
        <Col className="col-lg-8 col-12">
          <div
            className="col-12 relative-position"
            style={{
              backgroundImage: `url(${disease.picture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div className="glas col-12"></div>
          </div>
        </Col>
        <Col className="col-12 col-lg-4">
          <div>
            <p className="fs-2 ms-3 fw-bold">
              Apakah Anda Beresiko
              <br />
              Terkana {disease.name}?
            </p>
            <div className="oleh fw-semibold ms-3 mb-3">
              Ditinjau oleh <a href="">Kevin Arsan Kamto</a> pada 12 Maret 2024
            </div>
            <div className="btn-diagnosa col-6 ms-3">
              <Nav.Link
                onClick={handleShowModal1}
                className="text-center mt-2 mb-2 fw-bold fs-5"
              >
                Mulai Diagnosa
              </Nav.Link>
            </div>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-center">
        <div>
          <div className="warning mb-4">
            <p>
              <FaCircle className="bab mb-1 me-2" />
              Mendeteksi kemungkinan anda beresiko stunting
            </p>
            <p>
              <FaCircle className="mb-1 me-2" />
              Jawablah sesuai dengan kondisi anda
            </p>
            <p>
              <FaCircle className="mb-1 me-2" />
              Kami akan menjaga kerahasian informasi anda
            </p>
            <p>
              <FaCircle className="mb-1 me-2" />
              Tes dengan alat ini hanya akan berjalan beberapa menit saja
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="disclaimer">
          <div className="col-12 ms-5 me-5 mt-3 mb-3">
            <h5 className="fw-bold">
              <FaCircleExclamation className="mb-1 me-2" />
              Disclaimer
            </h5>
            <p className="col-12 ms-4">
              Deteksi dini stunting pada anak ini hanya alat deteksi awal,
              <br />
              bukan pengganti tes diagnostik. Segera kunjungi tenaga <br />{" "}
              medis terdekat untuk mendapatkan perawatan.
            </p>
          </div>
        </div>
      </div>

      <div className="modal-1">
        <Modal
          className=""
          size="lg"
          show={showModal1}
          onHide={handleCloseModal1}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title className="ms-2 fw-semibold col-sm-9 text-center mb-3">
            1. Hai, Silahkan isi biodata anda.
          </Modal.Title>
          <div className="modal-diagnosa container">
            <div className="row justify-content-center">
              <div className="col-sm-9">
                <Modal.Body>
                  <div className="privasi fw-semibold">
                    Privasi anda kami lindungi, jangan takut!!....
                  </div>
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" control="name">
                      <Form.Label>Nama Pasien</Form.Label>
                      <Form.Control
                        size="lg"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Nama Pasien..."
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" control="age">
                      <Form.Label>Usia</Form.Label>
                      <Form.Control
                        size="lg"
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleFormChange}
                        placeholder="Usia..."
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" control="gender">
                      <Form.Label>Jenis Kelamin</Form.Label>
                      <Form.Control
                        size="lg"
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleFormChange}
                        placeholder="Jenis Kelamin..."
                        required
                      />
                    </Form.Group>
                    <div className="text-end">
                      <Button
                        className="btn-diagnosaa mb-4 fw-bold me-2"
                        onClick={handleCloseModal1}
                      >
                        <FaAngleLeft className="me-2" />
                        Kembali
                      </Button>
                      <Button
                        className="btn-diagnosaa mb-4 fw-bold ms-2"
                        type="submit"
                      >
                        Selanjutnya
                        <FaAngleRight className="ms-2" />
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <div className="modal-2">
        <Modal
          className=""
          size="lg"
          show={showModal2}
          onHide={handleCloseModal2}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title className="ms-2 fw-semibold col-sm-9 text-center mb-3">
            2. Apakah tinggi badan anda kurang dari standar,?
          </Modal.Title>
          <div className="modal-diagnosa container">
            <div className="row justify-content-center">
              <div className="col-sm-9">
                <Modal.Body>
                  <div className="privasi fw-semibold">
                    Privasi anda kami lindungi, jangan takut!!....
                  </div>

                  <div className="text-end">
                    <Button
                      className="btn-diagnosaa mb-4 fw-bold me-2"
                      onClick={handleCloseModal2}
                    >
                      <FaAngleLeft className="me-2" />
                      Kembali
                    </Button>
                    <Button
                      className="btn-diagnosaa mb-4 fw-bold ms-2"
                      type="submit"
                    >
                      Selanjutnya
                      <FaAngleRight className="ms-2" />
                    </Button>
                  </div>
                </Modal.Body>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DiagnosaDetails;
