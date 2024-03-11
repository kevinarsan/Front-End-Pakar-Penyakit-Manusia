import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col, Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { FaStar, FaLocationDot, FaSketch } from "react-icons/fa6";
import kevin from "../../public/kevin.jpg";

const DaftarDokterPages = () => {
  const [dataDokter, setDataDokter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDokter = await axios.get(
          "http://localhost:5000/api/v1/about/description-team"
        );
        const dokterItems = responseDokter.data.about.filter(
          (item) => item.name === "Daftar Dokter"
        );

        setDataDokter(dokterItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="daftar-dokter w-100 overflow-hidden mb-5">
      {dataDokter.map((item) => (
        <div className="display-dokter mb-5" key={item.id}>
          <Col>
            <h1 className="text-center">
              Temukan Dokter Yang Cocok <br /> Dengan Kamu
            </h1>
            <div className="d-flex justify-content-center">
              <p className="text-center col-7 fs-5">{item.description}</p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <Form className="d-flex col-6 justify-content-center align-items-center">
                <Form.Control
                  type="search"
                  placeholder="  Cari..."
                  className=" fs-6"
                  aria-label="Search"
                />
              </Form>
            </div>
          </Col>
        </div>
      ))}

      <Container>
        <Row className="mb-4">
          <Col lg="4">
            <h3 className="fw-bold">Dokter Spesialis</h3>
          </Col>
          <Col lg="8">
            <div className="d-flex justify-content-end">
              <Form className="d-flex col-3 justify-content-center align-items-center">
                <Form.Control
                  type="search"
                  placeholder="  Cari..."
                  className="fs-6 me-2"
                  aria-label="Search"
                />
                <div className="search">
                  <Link to="#">
                    <BiSearchAlt className="text-white fs-4" />
                  </Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>

        <Row className="container">
          <Col lg="4">
            <div>
              <h5 className="fw-bold">Provinsi</h5>
              <Form>
                <div className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="flexCheckDefault"
                    label="Jawa Timur"
                  />
                </div>
              </Form>
            </div>

            <div>
              <h5 className="fw-bold">Kota</h5>
              <Form>
                <div className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="flexCheckDefault"
                    label="Surabaya"
                  />
                </div>
              </Form>
            </div>

            <div className="mb-5">
              <h5 className="fw-bold">Penyakit</h5>
              <Form>
                <div className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="flexCheckDefault"
                    label="Stunting"
                  />
                </div>
              </Form>
            </div>

            <div className="col-8 mt-5">
              <p className="dokter text-center">Hapus Filter</p>
            </div>
          </Col>

          <Col lg="8" className="d-flex">
            <div className="col-6 me-4">
              <Card>
                <Card.Img variant="top" src={kevin} />
                <Card.Body>
                  <div className="d-flex">
                    <Card.Title className="col-10 fs-6 fw-bold mb-0">
                      Dr. Kevin Arsan Kamto
                    </Card.Title>
                    <div className="col-2 d-flex">
                      <FaStar className="star me-1 mt-1 fs-6" />
                      <p className="fw-semibold fs-6">4.7</p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-0 fw-semibold">Pengobatan Stunting Anak</p>
                    <p className="dokter fw-semibold mb-0">
                      Dokter Spesialis Anak
                    </p>
                    <p className="location   fw-semibold">
                      <FaLocationDot className="me-1" />
                      Ds. Kaligrenjeng, Kec. Wonotirto, Blitar, Jawa Timur
                    </p>
                  </div>
                  <Button className="order d-flex align-items-center justify-content-center">
                    <FaSketch className="me-2" />
                    Pesan
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DaftarDokterPages;
