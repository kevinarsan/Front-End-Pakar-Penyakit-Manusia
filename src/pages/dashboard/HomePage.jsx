import React, { useState, useEffect } from "react";
import { Nav, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../public/wp-4.webp";
import hpv from "../../../public/istockphoto-1435661834-1024x1024.jpg";
import stunting2 from "../../../public/stunting 2.jpg";
import stroke2 from "../../../public/stroke.jpg";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";

const HomePage = () => {
  const [diseases, setDiseases] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/diseases/get")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.disease) {
          setDiseases(data.disease.slice(0, 6));
        }
      })
      .catch((error) => {
        console.error("Error fetching diseases:", error);
      });
  }, []);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="home-page w-100 overflow-hidden">
      <Row className="">
        <Col className="col-lg-8 col-12">
          <div
            className="col-12 relative-position"
            style={{
              backgroundImage: `url(${logo})`,
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
            <p className="fs-3 ms-3 fw-bold">
              Diagnosa
              <br />
              Penyakit Manusia Terbaik !!
            </p>
            <div className="pilih-penyakit col-6 ms-3">
              <Nav.Link
                onClick="/dashboard/detail-penyakit"
                href="/dashboard/detail-penyakit"
                className="text-center mt-1 mb-1 fw-bold fs-5"
              >
                Pilih Penyakit
              </Nav.Link>
            </div>
          </div>
        </Col>
      </Row>

      <div className="penyakit w-100 d-flex align-items-center justify-content-center mb-4">
        <Col lg="8">
          <div className="d-flex">
            <div className="fs-5 ms-3 fw-bold col-6">Diagnosa Penyakit</div>
            <div className="home-view fw-bold text-end col-6 me-5">
              <a href="/dashboard/detail-penyakit">Lihat Semua</a>
            </div>
          </div>
          <div className="d-flex">
            {diseases.map((disease) => (
              <Link
                key={disease.id}
                to={`/dashboard/detail-diagnosa/${disease.id}`}
                className="card-penyakit col-2 mt-2"
              >
                <div className="d-flex justify-content-center">
                  <img
                    className="justify-content-center"
                    src={disease.picture}
                    alt={disease.name}
                  />
                </div>
                <div className="text-center mt-2 fw-semibold">
                  {disease.name}
                </div>
              </Link>
            ))}
          </div>
        </Col>
      </div>

      <div className="w-100 d-flex align-items-center justify-content-center">
        <Col lg="8">
          <div className="d-flex">
            <div className="fs-5 ms-3 fw-bold col-6">Pengobatan Penyakit</div>
            <div className="home-view fw-bold text-end col-6 me-5">
              <a href="">Lihat Semua</a>
            </div>
          </div>
          <div className="d-flex">
            <Card className="col-4 me-1 ms-1 mt-3" onClick={handleCardClick}>
              <Card.Img variant="top" src={stunting2} />
              <div>
                <div className="d-flex col-12">
                  <div className="judul col-5 ms-2 fw-bold">
                    Penyakit Stunting
                  </div>
                  <div className="review col-6 text-end">
                    <FaStar className="mb-1 me-1 fw-bold" />
                    4.7
                  </div>
                </div>
                <div className="rs ms-2 fw-bold">RS. Umum Daerah Wates</div>
                <div className="dktr ms-2 mb-1">by Drh. Kevin Arsan Kamto</div>
                <div className="alamat mb-2 ms-2 fw-semibold">
                  <FaMapMarkerAlt className="me-1" />
                  Ds. Kaligrenjeng, Kec. Wonotirto, Blitar, Jawa Timur
                </div>
                <Button className="btn-buy col-6 d-flex ms-2 mb-2">
                  <div className="dm text-start col-5 me-1 fw-bold">
                    <IoDiamond className="me-1 fw-bold mb-1" /> Biaya
                  </div>
                  <div className="rp col-7 text-end fw-bold">Rp.100.000</div>
                </Button>
              </div>
            </Card>

            <Card className="col-4 me-1 ms-1 mt-3" onClick={handleCardClick}>
              <Card.Img variant="top" src={hpv} />
              <div>
                <div className="d-flex col-12">
                  <div className="judul col-5 ms-2 fw-bold">Penyakit HPV</div>
                  <div className="review col-6 text-end">
                    <FaStar className="mb-1 me-1 fw-bold" />
                    4.7
                  </div>
                </div>
                <div className="rs ms-2 fw-bold">RS. Umum Daerah Wates</div>
                <div className="dktr ms-2 mb-1">by Drh. Kevin Arsan Kamto</div>
                <div className="alamat mb-2 ms-2 fw-semibold">
                  <FaMapMarkerAlt className="me-1" />
                  Ds. Kaligrenjeng, Kec. Wonotirto, Blitar, Jawa Timur
                </div>
                <Button className="btn-buy col-6 d-flex ms-2 mb-2">
                  <div className="dm text-start col-5 me-1 fw-bold">
                    <IoDiamond className="me-1 fw-bold mb-1" /> Biaya
                  </div>
                  <div className="rp col-7 text-end fw-bold">Rp.100.000</div>
                </Button>
              </div>
            </Card>

            <Card className="col-4 me-1 ms-1 mt-3" onClick={handleCardClick}>
              <Card.Img variant="top" src={stroke2} />
              <div>
                <div className="d-flex col-12">
                  <div className="judul col-5 ms-2 fw-bold">
                    Penyakit Stroke
                  </div>
                  <div className="review col-6 text-end">
                    <FaStar className="mb-1 me-1 fw-bold" />
                    4.7
                  </div>
                </div>
                <div className="rs ms-2 fw-bold">RS. Umum Daerah Wates</div>
                <div className="dktr ms-2 mb-1">by Drh. Kevin Arsan Kamto</div>
                <div className="alamat mb-2 ms-2 fw-semibold">
                  <FaMapMarkerAlt className="me-1" />
                  Ds. Kaligrenjeng, Kec. Wonotirto, Blitar, Jawa Timur
                </div>
                <Button className="btn-buy col-6 d-flex ms-2 mb-2">
                  <div className="dm text-start col-5 me-1 fw-bold">
                    <IoDiamond className="me-1 fw-bold mb-1" /> Biaya
                  </div>
                  <div className="rp col-7 text-end fw-bold">Rp.100.000</div>
                </Button>
              </div>
            </Card>
          </div>

          <div className="d-flex">
            <Card className="col-4 me-1 ms-1 mt-3" onClick={handleCardClick}>
              <Card.Img variant="top" src={hpv} />
              <div>
                <div className="d-flex col-12">
                  <div className="judul col-5 ms-2 fw-bold">Penyakit HPV</div>
                  <div className="review col-6 text-end">
                    <FaStar className="mb-1 me-1 fw-bold" />
                    4.7
                  </div>
                </div>
                <div className="rs ms-2 fw-bold">RS. Umum Daerah Wates</div>
                <div className="dktr ms-2 mb-1">by Drh. Kevin Arsan Kamto</div>
                <div className="alamat mb-2 ms-2 fw-semibold">
                  <FaMapMarkerAlt className="me-1" />
                  Ds. Kaligrenjeng, Kec. Wonotirto, Blitar, Jawa Timur
                </div>
                <Button className="btn-buy col-6 d-flex ms-2 mb-2">
                  <div className="dm text-start col-5 me-1 fw-bold">
                    <IoDiamond className="me-1 fw-bold mb-1" /> Biaya
                  </div>
                  <div className="rp col-7 text-end fw-bold">Rp.100.000</div>
                </Button>
              </div>
            </Card>

            <Card className="col-4 me-1 ms-1 mt-3" onClick={handleCardClick}>
              <Card.Img variant="top" src={hpv} />
              <div>
                <div className="d-flex col-12">
                  <div className="judul col-5 ms-2 fw-bold">Penyakit HPV</div>
                  <div className="review col-6 text-end">
                    <FaStar className="mb-1 me-1 fw-bold" />
                    4.7
                  </div>
                </div>
                <div className="rs ms-2 fw-bold">RS. Umum Daerah Wates</div>
                <div className="dktr ms-2 mb-1">by Drh. Kevin Arsan Kamto</div>
                <div className="alamat mb-2 ms-2 fw-semibold">
                  <FaMapMarkerAlt className="me-1" />
                  Ds. Kaligrenjeng, Kec. Wonotirto, Blitar, Jawa Timur
                </div>
                <Button className="btn-buy col-6 d-flex ms-2 mb-2">
                  <div className="dm text-start col-5 me-1 fw-bold">
                    <IoDiamond className="me-1 fw-bold mb-1" /> Biaya
                  </div>
                  <div className="rp col-7 text-end fw-bold">Rp.100.000</div>
                </Button>
              </div>
            </Card>

            <Card className="col-4 me-1 ms-1 mt-3" onClick={handleCardClick}>
              <Card.Img variant="top" src={hpv} />
              <div>
                <div className="d-flex col-12">
                  <div className="judul col-5 ms-2 fw-bold">Penyakit HPV</div>
                  <div className="review col-6 text-end">
                    <FaStar className="mb-1 me-1 fw-bold" />
                    4.7
                  </div>
                </div>
                <div className="rs ms-2 fw-bold">RS. Umum Daerah Wates</div>
                <div className="dktr ms-2 mb-1">by Drh. Kevin Arsan Kamto</div>
                <div className="alamat mb-2 ms-2 fw-semibold">
                  <FaMapMarkerAlt className="me-1" />
                  Ds. Kaligrenjeng, Kec. Wonotirto, Blitar, Jawa Timur
                </div>
                <Button className="btn-buy col-6 d-flex ms-2 mb-2">
                  <div className="dm text-start col-5 me-1 fw-bold">
                    <IoDiamond className="me-1 fw-bold mb-1" /> Biaya
                  </div>
                  <div className="rp col-7 text-end fw-bold">Rp.100.000</div>
                </Button>
              </div>
            </Card>
          </div>
        </Col>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Informasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Maaf, fitur pengobatan belum tersedia, silahkan coba beberapa saat
          lagi.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomePage;
