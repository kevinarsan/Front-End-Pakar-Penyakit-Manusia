import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  FaCircle,
  FaCircleExclamation,
  FaAngleRight,
  FaAngleLeft,
  FaRotate,
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
  const [diagnoseResult, setDiagnoseResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [showModalGejala, setShowModalGejala] = useState(false);
  const [currentSymptomIndex, setCurrentSymptomIndex] = useState(0);

  const [biodata, setBiodata] = useState({
    name: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/v1/rule-base/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.rule) {
          const filteredSymptoms = response.data.rule.filter(
            (symptom) => symptom.diseasesId === parseInt(id)
          );
          setAllSymptoms(filteredSymptoms);
        }
      })
      .catch((error) => {
        console.error("Error fetching symptoms:", error);
      });

    axios
      .get(`http://localhost:5000/api/v1/diseases/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.disease) {
          setDisease(response.data.disease);
        }
      })
      .catch((error) => {
        console.error("Error fetching disease:", error);
      });
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBiodata({ ...biodata, [name]: value });
    if (name === "symptomIds") {
      setFormData({ ...formData, [name]: JSON.parse(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const dataToSend = { ...formData, ...biodata };
    axios
      .post("http://localhost:5000/api/v1/diagnoses/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Diagnosa berhasil:", response.data);
        setDiagnoseResult(response.data.diagnoses);
        setShowModal1(false);
        setShowResultModal(true);
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

  const handleRefreshPage = () => {
    window.location.reload();
  };

  const handleNextSymptom = () => {
    setCurrentSymptomIndex(currentSymptomIndex + 1);
  };

  const handlePreviousSymptom = () => {
    setCurrentSymptomIndex(currentSymptomIndex - 1);
  };

  const renderSymptom = () => {
    const symptom = allSymptoms[currentSymptomIndex];
    if (symptom && symptom.diseasesId === parseInt(id)) {
      const isChecked = formData.symptomIds.includes(symptom.symptomId);
      return (
        <div className="modal-gejala mb-3">
          <div className="d-flex justify-content-center col-12">
            <Modal.Title className="ms-2 fw-semibold col-sm-9 mb-4">
              {symptom.symptom.name}
            </Modal.Title>
          </div>

          <div className="d-flex justify-content-center col-12">
            <Form.Check
              className="fs-5 mb-2 col-sm-8"
              type="checkbox"
              id={`symptom-${symptom.symptomId}`}
              label="Ya"
              checked={isChecked}
              onChange={(e) =>
                handleSymptomChange(symptom.symptomId, e.target.checked)
              }
            />
          </div>
          <div className="d-flex justify-content-center">
            <Form.Check
              className="fs-5 col-sm-8"
              type="checkbox"
              label="Tidak"
              checked={!isChecked}
              onChange={(e) =>
                handleSymptomChange(symptom.symptomId, !e.target.checked)
              }
            />
          </div>
        </div>
      );
    }
    return null;
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
            <div className="glas col-12"></div>
          </div>
        </Col>
        <Col className="col-12 col-lg-4">
          <div>
            <p className="fs-2 ms-3 fw-bold">
              Apakah Anda Beresiko
              <br />
              Terkana {disease.name} ?
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

      {/* MODAL BIODATA */}
      <div className="modal-1">
        <Modal
          className=""
          size="lg"
          show={showModal1}
          onHide={handleCloseModal1}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title className="ms-2 fw-semibold col-sm-9 text-center mb-3">
            Hai, Silahkan isi biodata anda.
          </Modal.Title>
          <div className="modal-diagnosa container">
            <div className="row justify-content-center">
              <div className="col-sm-9">
                <Modal.Body>
                  <div className="privasi fw-semibold">
                    Privasi anda kami lindungi, jangan takut!!....
                  </div>
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="name">
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
                    <Form.Group className="mb-3" controlId="age">
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
                    <Form.Group className="mb-3" controlId="gender">
                      <Form.Label>Jenis Kelamin</Form.Label>
                      <Form.Select
                        size="lg"
                        name="gender"
                        value={formData.gender}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="laki-laki">Laki-laki</option>
                        <option value="perempuan">Perempuan</option>
                      </Form.Select>
                    </Form.Group>
                    <div className="col-12 text-end">
                      <Button
                        className="btn-diagnosaa mb-4 fw-bold ms-2"
                        onClick={() => {
                          setShowModalGejala(true);
                          handleCloseModal1();
                        }}
                      >
                        Lanjut
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

      {/* MODAL GEJALA */}
      <Modal
        className=""
        size="lg"
        show={showModalGejala}
        onHide={() => setShowModalGejala(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            {renderSymptom()}
            <div className="text-end col-10">
              {currentSymptomIndex > 0 && (
                <Button
                  className="btn-diagnosaa mb-4 fw-bold me-2"
                  onClick={handlePreviousSymptom}
                >
                  <FaAngleLeft className="me-2" />
                  Sebelumnya
                </Button>
              )}
              {currentSymptomIndex < allSymptoms.length - 1 && (
                <Button
                  className="btn-diagnosaa mb-4 fw-bold ms-2"
                  onClick={handleNextSymptom}
                >
                  Lanjut
                  <FaAngleRight className="ms-2" />
                </Button>
              )}
              {currentSymptomIndex === allSymptoms.length - 1 && (
                <Button
                  className="btn-diagnosaa mb-4 fw-bold ms-2"
                  type="submit"
                >
                  Diagnosa
                  <FaAngleRight className="ms-2" />
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* MODAL HASIL */}
      <Modal
        className=""
        size="lg"
        show={showResultModal}
        onHide={handleRefreshPage}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {diagnoseResult && (
            <div className="hasil-diagnosa">
              <div className="col-12 d-flex justify-content-center mb-3">
                <img
                  src={disease.picture}
                  alt={disease.name}
                  className="img-diagnosa col-5"
                />
              </div>
              <p className="text-center fw-bold fs-3">
                {diagnoseResult.status} {disease.name}
              </p>
              <div className="d-flex justify-content-center col-12 fs-5">
                <p className="text-center col-9">
                  {diagnoseResult.name} anda {diagnoseResult.status}{" "}
                  {disease.name}. Kami sarankan Anda untuk melakukan pemeriksaan
                  lanjutan ke dokter terdekat. Cari dokter terdekat{" "}
                  <a href="#">disini</a>, dan cari tahu informasi lainnya
                  seputar {disease.name} <a href="#">disini</a>{" "}
                </p>
              </div>
              <div className="btn-tes-ulang d-flex justify-content-center col-12">
                <Link
                  key={disease.id}
                  onClick={handleRefreshPage}
                  className="d-flex align-items-center justify-content-center fs-5 fw-bold"
                >
                  <FaRotate className="me-3 fs-5" /> Tes Ulang
                </Link>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <div className="underline col-9"></div>
              </div>
              <div className="d-flex justify-content-center mb-4">
                <div className="disclaimer col-9 mt-4">
                  <div className="col-12 ms-5 me-5 mt-3 mb-3">
                    <h5 className="fw-bold">
                      <FaCircleExclamation className="mb-1 me-2" />
                      Disclaimer
                    </h5>
                    <p className="col-9 ms-4">
                      Alat cek resiko kesehatan ini bukanlah pengganti
                      konsulltasi medis. Selalu konsultasi ke dokter anda
                      sebelum memutuskan perawatan terkait sebuah penyakit.
                      Diagnosify tidak memberikan saran medis, diagnosis, atau
                      perawatan yang mendalam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DiagnosaDetails;
