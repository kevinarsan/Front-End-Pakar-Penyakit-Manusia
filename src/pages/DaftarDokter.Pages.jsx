import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col, Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import {
  FaStar,
  FaLocationDot,
  FaSketch,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa6";

const DaftarDokterPages = () => {
  const [dataDokter, setDataDokter] = useState([]);
  const [dokterData, setDokterData] = useState([]);
  const [uniqueProvinces, setUniqueProvinces] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueSpesialis, setUniqueSpesialis] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  const [displayedProvinces, setDisplayedProvinces] = useState([]);
  const [displayedCities, setDisplayedCities] = useState([]);
  const [displayedSpesialis, setDisplayedSpesialis] = useState([]);

  // Menentukan batas jumlah yang ditampilkan
  const MAX_DISPLAY_COUNT = 5;

  const [showAllProvinces, setShowAllProvinces] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);
  const [showAllSpesialis, setShowAllSpesialis] = useState(false);

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

        const response = await axios.get(
          "http://localhost:5000/api/v1/profiles/get-all-doctor"
        );
        setDokterData(response.data.get);

        const provinces = [...new Set(dokterData.map((item) => item.province))];
        const cities = [...new Set(dokterData.map((item) => item.city))];
        const spesialis = [
          ...new Set(dokterData.map((item) => item.spesialis)),
        ];

        setUniqueProvinces(provinces);
        setUniqueCities(cities);
        setUniqueSpesialis(spesialis);

        setDisplayedProvinces(
          showAllProvinces ? provinces : provinces.slice(0, MAX_DISPLAY_COUNT)
        );

        setDisplayedCities(
          showAllCities ? cities : cities.slice(0, MAX_DISPLAY_COUNT)
        );

        setDisplayedSpesialis(
          showAllSpesialis ? spesialis : spesialis.slice(0, MAX_DISPLAY_COUNT)
        );

        const responseReview = await axios.get(
          "http://localhost:5000/api/v1/reviews/overal"
        );

        setReviewData(responseReview.data.get);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dokterData, showAllProvinces, showAllCities, showAllSpesialis]);

  const toggleShowAll = (type) => {
    switch (type) {
      case "provinces":
        setShowAllProvinces(!showAllProvinces);
        break;
      case "cities":
        setShowAllCities(!showAllCities);
        break;
      case "spesialis":
        setShowAllSpesialis(!showAllSpesialis);
        break;
      default:
        break;
    }
  };

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
          <Col lg="6">
            <h3 className="fw-bold">Dokter Spesialis</h3>
          </Col>
          <Col lg="6">
            <div className="d-flex justify-content-end">
              <Form className="d-flex col-5 justify-content-center align-items-center">
                <Form.Control
                  type="search"
                  placeholder="  Cari..."
                  className="fs-6 me-2"
                  aria-label="Search"
                />
                <div className="search">
                  <Link to="#">
                    <BiSearchAlt className="ms-1 text-white fs-4" />
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
              {displayedProvinces.map((province, index) => (
                <Form key={index}>
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={`province-${index}`}
                      label={province}
                    />
                  </div>
                </Form>
              ))}
              {uniqueProvinces.length > MAX_DISPLAY_COUNT && (
                <Button
                  className="mb-3"
                  variant="link"
                  onClick={() => toggleShowAll("provinces")}
                >
                  {showAllProvinces ? (
                    <>
                      Sembunyikan <FaAngleUp />
                    </>
                  ) : (
                    <>
                      Lihat Lainnya <FaAngleDown />
                    </>
                  )}
                </Button>
              )}
            </div>

            <div>
              <h5 className="fw-bold">Kota</h5>
              {displayedCities.map((city, index) => (
                <Form key={index}>
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={`city-${index}`}
                      label={city}
                    />
                  </div>
                </Form>
              ))}
              {uniqueCities.length > MAX_DISPLAY_COUNT && (
                <Button
                  className="mb-3"
                  variant="link"
                  onClick={() => toggleShowAll("cities")}
                >
                  {showAllCities ? (
                    <>
                      Sembunyikan <FaAngleUp />
                    </>
                  ) : (
                    <>
                      Lihat Lainnya <FaAngleDown />
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="mb-5">
              <h5 className="fw-bold">Dokter Spesialis</h5>
              {displayedSpesialis.map((spesialis, index) => (
                <Form key={index}>
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={`spesialis-${index}`}
                      label={spesialis}
                    />
                  </div>
                </Form>
              ))}
              {uniqueSpesialis.length > MAX_DISPLAY_COUNT && (
                <Button
                  className="mb-3"
                  variant="link"
                  onClick={() => toggleShowAll("spesialis")}
                >
                  {showAllSpesialis ? (
                    <>
                      Sembunyikan <FaAngleUp />
                    </>
                  ) : (
                    <>
                      Lihat Lainnya <FaAngleDown />
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="dokter col-6 mt-5">
              <p className="text-center">Hapus Filter</p>
            </div>
          </Col>

          <Col lg="8">
            <Row>
              {reviewData.map((item, index) => (
                <Col
                  key={item.id}
                  lg="6"
                  className={`mb-4 ${index % 2 !== 0 ? "order-lg-last" : ""}`}
                >
                  <Card>
                    <Card.Img variant="top" src={item.picture} />
                    <Card.Body>
                      <div className="d-flex">
                        <Card.Title className="col-10 fs-6 fw-bold mb-0">
                          {item.name}
                        </Card.Title>
                        <div className="col-2 d-flex">
                          <FaStar className="star me-1 mt-1 fs-6" />
                          <p className="fw-semibold fs-6">
                            {item.overalRating.toFixed(1)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="spesialis fw-semibold mb-0 overflow-ellipsis">
                          {item.spesialis}
                        </p>
                        <p className="mb-0 fw-normal overflow-ellipsis">
                          {item.description}
                        </p>
                        <p className="location fw-semibold overflow-ellipsis">
                          <FaLocationDot className="me-1" />
                          {item.details}
                        </p>
                      </div>
                      <Button className="order d-flex align-items-center justify-content-center">
                        <FaSketch className="me-2" />
                        Pesan
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DaftarDokterPages;
