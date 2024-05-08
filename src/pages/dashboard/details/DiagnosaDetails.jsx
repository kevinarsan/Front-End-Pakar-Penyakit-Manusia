import React from "react";
import { Row, Col, Nav } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCircle, FaCircleExclamation } from "react-icons/fa6";
import logo from "../../../../public/conten.jpg";

const DiagnosaDetails = () => {
  return (
    <div className="home-detail w-100 overflow-hidden">
      <Row className="mb-5">
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
            <p className="fs-2 ms-3 fw-bold">
              Deteksi Dini
              <br />
              Stunting Pada Anak
            </p>
            <div className="oleh fw-semibold ms-3 mb-3">
              Ditinjau oleh Dr.Kevin Arsan Kamto pada 12 Maret 2024
            </div>
            <div className="btn-diagnosa col-6 ms-3">
              <Nav.Link
                onClick="/dashboard/detail-penyakit"
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
              Mendeteksi kemungkinan anak anda beresiko stunting
            </p>
            <p>
              <FaCircle className="mb-1 me-2" />
              Jawablah sesuai dengan kondisi anak anda
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
    </div>
  );
};

export default DiagnosaDetails;
