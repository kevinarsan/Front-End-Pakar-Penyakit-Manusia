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

const DiagnosaDetails = () => {
  const { id } = useParams();
  const [disease, setDisease] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    diseasesId: parseInt(id),
    symptomIds: [],
  });
  const [showModal1, setShowModal1] = useState(false);
  const [showModalGejala, setShowModalGejala] = useState(false);
  const [diagnoseResult, setDiagnoseResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [allSymptoms, setAllSymptoms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/rule-base/get")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.rule) {
          setAllSymptoms(data.rule);
        }
      })
      .catch((error) => {
        console.error("Error fetching symptoms:", error);
      });

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "symptomIds") {
      setFormData({ ...formData, [name]: JSON.parse(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/diagnoses/create", formData)
      .then((response) => {
        console.log("Diagnosa berhasil:", response.data);
        setDiagnoseResult(response.data.diagnose);
        setShowModal1(false);
        setShowModalGejala(true);
      })
      .catch((error) => {
        console.error("Error posting diagnosa data:", error);
      });
  };

  const handleShowModal1 = () => {
    setShowModal1(true);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
  };

  const renderSymptoms = () => {
    return allSymptoms.map((rule) => {
      if (rule.diseasesId === parseInt(id)) {
        return (
          <div key={rule.id} className="mb-3">
            <Form.Label> {rule.symptom.name} </Form.Label>{" "}
            <div className="d-flex">
              <Form.Check
                className="me-5"
                type="checkbox"
                id={`symptom-${rule.symptomId}`}
                label="Ya"
                onChange={(e) =>
                  handleSymptomChange(rule.symptomId, e.target.checked)
                }
              />{" "}
              <Form.Check
                type="checkbox"
                id={`symptom-${rule.symptomId}`}
                label="Tidak"
                onChange={(e) =>
                  handleSymptomChange(rule.symptomId, e.target.checked)
                }
              />{" "}
            </div>{" "}
          </div>
        );
      }
      return null;
    });
  };

  const handleSymptomChange = (symptomId, checked) => {
    let updatedSymptomIds = [...formData.symptomIds];
    if (checked) {
      updatedSymptomIds.push(symptomId);
    } else {
      updatedSymptomIds = updatedSymptomIds.filter((id) => id !== symptomId);
    }
    setFormData({ ...formData, symptomIds: updatedSymptomIds });
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
            <div className="glas col-12"> </div>{" "}
          </div>{" "}
        </Col>{" "}
        <Col className="col-12 col-lg-4">
          <div>
            <p className="fs-2 ms-3 fw-bold">
              Apakah Anda Beresiko <br />
              Terkana {disease.name} ?
            </p>{" "}
            <div className="oleh fw-semibold ms-3 mb-3">
              Ditinjau oleh <a href=""> Kevin Arsan Kamto </a> pada 12 Maret
              2024{" "}
            </div>{" "}
            <div className="btn-diagnosa col-6 ms-3">
              <Nav.Link
                onClick={handleShowModal1}
                className="text-center mt-2 mb-2 fw-bold fs-5"
              >
                Mulai Diagnosa{" "}
              </Nav.Link>{" "}
            </div>{" "}
          </div>{" "}
        </Col>{" "}
      </Row>
      <div className="d-flex justify-content-center">
        <div>
          <div className="warning mb-4">
            <p>
              <FaCircle className="bab mb-1 me-2" />
              Mendeteksi kemungkinan anda beresiko stunting{" "}
            </p>{" "}
            <p>
              <FaCircle className="mb-1 me-2" />
              Jawablah sesuai dengan kondisi anda{" "}
            </p>{" "}
            <p>
              <FaCircle className="mb-1 me-2" />
              Kami akan menjaga kerahasian informasi anda{" "}
            </p>{" "}
            <p>
              <FaCircle className="mb-1 me-2" />
              Tes dengan alat ini hanya akan berjalan beberapa menit saja{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="d-flex justify-content-center">
        <div className="disclaimer">
          <div className="col-12 ms-5 me-5 mt-3 mb-3">
            <h5 className="fw-bold">
              <FaCircleExclamation className="mb-1 me-2" />
              Disclaimer{" "}
            </h5>{" "}
            <p className="col-12 ms-4">
              Deteksi dini stunting pada anak ini hanya alat deteksi awal,{" "}
              <br />
              bukan pengganti tes diagnostik.Segera kunjungi tenaga <br /> medis
              terdekat untuk mendapatkan perawatan.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="modal-1">
        <Modal
          className=""
          size="lg"
          show={showModal1}
          onHide={handleCloseModal1}
        >
          <Modal.Header closeButton> </Modal.Header>{" "}
          <Modal.Title className="ms-2 fw-semibold col-sm-9 text-center mb-3">
            1. Hai, Silahkan isi biodata anda.{" "}
          </Modal.Title>{" "}
          <div className="modal-diagnosa container">
            <div className="row justify-content-center">
              <div className="col-sm-9">
                <Modal.Body>
                  <div className="privasi fw-semibold">
                    Privasi anda kami lindungi, jangan takut!!....{" "}
                  </div>{" "}
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label> Nama Pasien </Form.Label>{" "}
                      <Form.Control
                        size="lg"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Nama Pasien..."
                        required
                      />
                    </Form.Group>{" "}
                    <Form.Group className="mb-3" controlId="age">
                      <Form.Label> Usia </Form.Label>{" "}
                      <Form.Control
                        size="lg"
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleFormChange}
                        placeholder="Usia..."
                        required
                      />
                    </Form.Group>{" "}
                    <Form.Group className="mb-3" controlId="gender">
                      <Form.Label> Jenis Kelamin </Form.Label>{" "}
                      <Form.Control
                        size="lg"
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleFormChange}
                        placeholder="Jenis Kelamin..."
                        required
                      />
                    </Form.Group>{" "}
                    <div className="text-end">
                      <Button
                        className="btn-diagnosaa mb-4 fw-bold me-2"
                        onClick={handleCloseModal1}
                      >
                        <FaAngleLeft className="me-2" />
                        Kembali{" "}
                      </Button>{" "}
                      <Button
                        className="btn-diagnosaa mb-4 fw-bold ms-2"
                        type="button" // Mengubah type menjadi "button"
                        onClick={() => setShowModalGejala(true)}
                      >
                        Lanjut <FaAngleRight className="ms-2" />
                      </Button>{" "}
                    </div>{" "}
                  </Form>{" "}
                </Modal.Body>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </Modal>{" "}
      </div>
      <Modal
        className="modal-gejala"
        size="lg"
        show={showModalGejala} // Menggunakan state baru
        onHide={() => setShowModalGejala(false)}
      >
        <Modal.Header closeButton> </Modal.Header>{" "}
        <Modal.Title className="ms-2 fw-semibold col-sm-9 text-center mb-3">
          Pilih Gejala{" "}
        </Modal.Title>{" "}
        <Modal.Body>
          {" "}
          {/* Render symptoms */} {renderSymptoms()}{" "}
        </Modal.Body>{" "}
        <Button
          className="btn-diagnosaa mb-4 fw-bold ms-2"
          type="submit" // Mengubah type menjadi "button"
        >
          Lanjut <FaAngleRight className="ms-2" />
        </Button>{" "}
      </Modal>
      <Modal
        className=""
        size="lg"
        show={showResultModal}
        onHide={handleCloseResultModal}
      >
        <Modal.Header closeButton>
          <Modal.Title className="ms-2 fw-semibold col-sm-9 text-center mb-3">
            Hasil Diagnosa{" "}
          </Modal.Title>{" "}
        </Modal.Header>{" "}
        <Modal.Body>
          {" "}
          {diagnoseResult && (
            <div>
              <p> Nama: {diagnoseResult.name} </p>{" "}
              <p> Usia: {diagnoseResult.age} </p>{" "}
              <p> Jenis Kelamin: {diagnoseResult.gender} </p>{" "}
              <p> Penyakit: {diagnoseResult.disease} </p>{" "}
              <p> Probabilitas: {diagnoseResult.probabilityResult} </p>{" "}
            </div>
          )}{" "}
        </Modal.Body>{" "}
      </Modal>{" "}
    </div>
  );
};

export default DiagnosaDetails;
