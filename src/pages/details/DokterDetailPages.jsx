// DetailDokter.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaWhatsapp,
  FaGripLinesVertical,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Container, Col, Row, Button, Form, Nav } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DetailDokterPages = () => {
  const { id } = useParams();
  const [detailDokter, setDetailDokter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/reviews/overal/${id}`
        );
        setDetailDokter(response.data.get);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!detailDokter) {
    return <div>Loading...</div>;
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div className="details w-100 overflow-hidden">
      <Row className="detail-dokter d-flex justify-content-center">
        <Col lg="9">
          <Link to="/daftar-dokter">
            <h5 className="text-black fw-semibold mb-3">
              <FaArrowLeft className="fs-5 mb-1 me-1" /> Kembali
            </h5>
          </Link>
          <div className="d-flex align-items-center col-12">
            <img
              src={detailDokter.picture}
              alt="picture-dokter"
              className="me-3"
            />
            <div className="col-12">
              <div className="d-flex align-items-center">
                <h5 className="col-6 mb-1 fw-bold text-black">
                  {detailDokter.name}
                </h5>
                <p
                  className=" text-end fs-5 mb-1"
                  style={{ cursor: "pointer" }}
                >
                  {detailDokter.overallRating.toFixed(1)}
                  <FaStar className="star ms-2 mb-1 fs-5" />
                </p>
              </div>
              <h6 className="text-black mb-2">{detailDokter.spesialis}</h6>
              <div className="d-flex">
                <Button
                  as="a"
                  href={`https://wa.me/${detailDokter.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa me-2 fs-6 fw-semibold"
                >
                  <FaWhatsapp className="fs-5 fw-bold me-2 mb-1" />
                  WhatsApp
                </Button>
                <Button className="booking ms-2 fs-6 fw-semibold">
                  Booking
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Container className="">
        <Row className="mt-3">
          <Col lg="9">
            <div>
              <div className="sekilas">
                <div className="d-flex justify-content-center">
                  <div className="d-flex align-items-center col-11">
                    <FaGripLinesVertical className="line mb-2 mt-4" />
                    <h5 className="mb-0 fw-bold text-black mb-2 mt-4">
                      {" "}
                      Sekilas
                    </h5>
                  </div>
                </div>
                <div className="d-flex justify-content-center ms-3">
                  <p className="col-11 mb-4">{detailDokter.description}</p>
                </div>
              </div>

              <div className="tentang-dokter mt-2">
                <div className="mb-0 informasi">
                  <Nav variant="underline" defaultActiveKey="/home">
                    <Nav.Item className="me-2">
                      <Nav.Link className="fw-bold fs-5" to="/">
                        Informasi Umum
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-2">
                      <Nav.Link className="fw-bold fs-5" to="/">
                        Reviews
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>

                <div className="d-flex align-items-center">
                  <FaGripLinesVertical className="line mb-2 mt-3" />
                  <h5 className="mb-0 fw-bold text-black mb-2 mt-3">
                    Tentang Dokter
                  </h5>
                </div>

                <div className="me-3">
                  <p>{detailDokter.aboutDoctor}</p>
                </div>
              </div>
            </div>
          </Col>

          <Col lg="3">
            <div className="mt-3 mb-3">
              <h5 className="fw-bold">Perjanjian Pasien</h5>
              <p>
                Biaya yang tertera belum termasuk administrasi serta dapat
                berubah sewaktu - waktu
              </p>
              <h6 className="fw-semibold">Tanggal perjanjian</h6>
              <div className="d-flex align-items-center mb-3">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowCalendar(!showCalendar)}
                ></div>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd MMMM yyyy"
                    className="form-control"
                    style={{
                      display: showCalendar ? "block" : "none",
                      position: "absolute",
                      zIndex: 1,
                      top: "100%",
                    }}
                  />
                </div>
              </div>

              <h6 className="fw-semibold">Jam Perjanjian</h6>
              <div className="d-flex align-items-center mb-3">
                <div>
                  <Form.Control type="text" placeholder="Cek Jadwal" />
                </div>
              </div>

              <h6 className="fw-bold text-danger">
                $ Mulai dari Rp. 100.000,00
              </h6>

              <div className="col-12">
                <Button className="btn-order ms-2 fs-6 fw-semibold col-11">
                  Lanjutkan Pemesanan
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailDokterPages;
