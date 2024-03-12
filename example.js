import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col, Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { FaStar, FaLocationDot, FaSketch } from "react-icons/fa6";
import logo from "../../public/kevin.jpg";

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

  // State untuk melacak apakah tombol "Lihat Lainnya" diklik atau tidak
  const [showAllProvinces, setShowAllProvinces] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);
  const [showAllSpesialis, setShowAllSpesialis] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ... (kode sebelumnya tetap sama)

        setUniqueProvinces(provinces);
        setUniqueCities(cities);
        setUniqueSpesialis(spesialis);

        // Setelah mendapatkan data unik, kita hanya akan menampilkan sejumlah maksimal
        setDisplayedProvinces(provinces.slice(0, MAX_DISPLAY_COUNT));
        setDisplayedCities(cities.slice(0, MAX_DISPLAY_COUNT));
        setDisplayedSpesialis(spesialis.slice(0, MAX_DISPLAY_COUNT));

        // ... (kode sebelumnya tetap sama)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dokterData]);

  return (
    <div className="daftar-dokter w-100 overflow-hidden mb-5">
      {" "}
      {/* ... (kode sebelumnya tetap sama) */}
      <Container>
        <Row className="mb-4"> {/* ... (kode sebelumnya tetap sama) */} </Row>
        <Row className="container">
          <Col lg="4">
            <div>
              <h5 className="fw-bold"> Provinsi </h5>{" "}
              {displayedProvinces.map((province, index) => (
                <Form key={index}>
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={`province-${index}`}
                      label={province}
                    />{" "}
                  </div>{" "}
                </Form>
              ))}{" "}
              {uniqueProvinces.length > MAX_DISPLAY_COUNT &&
                !showAllProvinces && (
                  <Button
                    variant="link"
                    onClick={() => setShowAllProvinces(true)}
                  >
                    Lihat Lainnya{" "}
                  </Button>
                )}{" "}
            </div>
            {/* ... (kode sebelumnya tetap sama) */}{" "}
          </Col>
          <Col lg="8" className="d-flex">
            {" "}
            {reviewData.map((item) => (
              <div key={item.id} className="col-6 me-4">
                {" "}
                {/* ... (kode sebelumnya tetap sama) */}{" "}
              </div>
            ))}{" "}
          </Col>{" "}
        </Row>{" "}
      </Container>{" "}
    </div>
  );
};

export default DaftarDokterPages;
