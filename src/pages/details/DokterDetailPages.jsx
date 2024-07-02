import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaWhatsapp,
  FaGripLinesVertical,
  FaCircle,
  FaPhone,
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
  const [activeTab, setActiveTab] = useState("informasi-umum");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api-penyakit-manusia.up.railway.app/api/v1/profiles/doctor/${id}`
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

  const renderContent = () => {
    if (activeTab === "informasi-umum") {
      return (
        <>
          <div>
            <div>
              <div className="d-flex align-items-center">
                <FaGripLinesVertical className="line mb-2 mt-3" />
                <h5 className="mb-0 fw-bold text-black mb-2 mt-3">
                  Tentang Dokter
                </h5>
              </div>
              <div className="me-3">
                <p>{detailDokter.aboutUs}</p>
              </div>
            </div>

            <div className="bio mt-4">
              <div className="d-flex">
                <div className="col-6">
                  <div className="d-flex align-items-center mb-3">
                    <FaGripLinesVertical className="line mb-2 mt-3" />
                    <h5 className="mb-0 fw-bold mb-2 mt-3">Pengalaman</h5>
                  </div>
                  {detailDokter.experience.map((experience, index) => (
                    <div key={index}>
                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <FaCircle className="me-2 circle mb-2" />
                          <h6>{experience.position}</h6>
                        </div>
                        <p className="ms-3">{experience.office}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center mb-3">
                    <FaGripLinesVertical className="line mb-2 mt-3" />
                    <h5 className="mb-0 fw-bold mb-2 mt-3">Pendidikan</h5>
                  </div>

                  {detailDokter.education.map((education, index) => (
                    <div key={index}>
                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <FaCircle className="me-2 circle mb-2" />
                          <h6>{education.name}</h6>
                        </div>
                        <p className="ms-3 mb-1">{education.programStudy}</p>
                        <p className="ms-3 ">{education.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-flex">
                <div className="col-6">
                  <div className="d-flex align-items-center mb-3">
                    <FaGripLinesVertical className="line mb-2 mt-3" />
                    <h5 className="mb-0 fw-bold mb-2 mt-3">Keanggotaan</h5>
                  </div>
                  {detailDokter.biodata.map((biodata, index) => (
                    <div key={index}>
                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <FaCircle className="me-2 circle mb-2" />
                          <h6>{biodata.organization}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-6">
                  <div className="d-flex align-items-center mb-3">
                    <FaGripLinesVertical className="line mb-2 mt-3" />
                    <h5 className="mb-0 fw-bold mb-2 mt-3">
                      Bahasa yang diucapkan
                    </h5>
                  </div>

                  {detailDokter.biodata.map((biodata, index) => (
                    <div key={index}>
                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <FaCircle className="me-2 circle mb-2" />
                          <h6>{biodata.language}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rs mt-3">
              <div className="d-flex align-items-center mb-3">
                <FaGripLinesVertical className="line mb-2 mt-3" />
                <h5 className="mb-0 fw-bold text-black mb-2 mt-3">
                  Info Rumah Sakit
                </h5>
              </div>
              {detailDokter.hospitalDoctor.map((hospital, index) => (
                <div key={index}>
                  <iframe
                    className="maps col-12"
                    title={`Google Maps Location ${index}`}
                    src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
                      hospital.hospital.location
                    )}&key=YOUR_API_KEY`}
                    height="350"
                    loading="lazy"
                  ></iframe>
                  <div className="detail-maps">
                    <h5 className="mt-3 ms-4">{hospital.hospital.name}</h5>
                    <p className="ms-4">{hospital.hospital.details}</p>
                    <Button className="btn-maps ms-4 mb-3 fs-6 fw-semibold">
                      <FaPhone className="me-2 mb-1" /> Masuk Untuk Menelepon
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="jam mt-4">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <FaGripLinesVertical className="line mb-2 mt-3" />
                  <h5 className="mb-0 fw-bold mb-2 mt-3">Jam Reguler</h5>
                </div>
                {detailDokter.practiceDoctor.map((practice, index) => (
                  <div key={index} className="d-flex">
                    <div className="col-4">
                      <p>{practice.practice.days}</p>
                    </div>
                    <div className="col-5 d-flex">
                      <p>{practice.practice.open} - </p>
                      <p> {practice.practice.close}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="asuransi">
              <div className="d-flex align-items-center mb-3">
                <FaGripLinesVertical className="line mb-2 mt-3" />
                <h5 className="mb-0 fw-bold mb-2 mt-3">Asuransi</h5>
              </div>
              <div>
                <p>
                  Semua penyedia layanan di HHG wajib mencantumkan paket
                  asuransi dalam jaringan secara akurat. Jika terdapat masalah,
                  tim Layanan kami akan membantu menghubungkan Anda dengan
                  penyedia layanan.
                </p>
              </div>
            </div>
          </div>
        </>
      );
    } else if (activeTab === "reviews") {
      return (
        <>
          <div className="mb-4">
            {detailDokter.review.map((review, index) => (
              <div key={index} className="review d-flex">
                <div>
                  <img
                    src={
                      review.user.profile
                        ? review.user.profile.picture
                        : review.user.profileDoctor
                        ? review.user.profileDoctor.picture
                        : ""
                    }
                    alt="picture-dokter"
                    className="me-3 ms-3 mt-3"
                  />
                </div>
                <div>
                  <p className="mb-0 mt-3">{review.user.username}</p>
                  <div className="rating mb-2">
                    {[...Array(review.value)].map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                  </div>
                  <p className="mb-0">{review.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }
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
                  onClick={() => setActiveTab("reviews")}
                >
                  {detailDokter.rating && detailDokter.rating.length > 0
                    ? detailDokter.rating[0].overalRating.toFixed(1)
                    : "0"}
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
                      <Nav.Link
                        className={`fw-bold fs-5 ${
                          activeTab === "informasi-umum" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("informasi-umum")}
                      >
                        Informasi Umum
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-2">
                      <Nav.Link
                        className={`fw-bold fs-5 ${
                          activeTab === "reviews" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("reviews")}
                      >
                        Reviews
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                {renderContent()}
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
