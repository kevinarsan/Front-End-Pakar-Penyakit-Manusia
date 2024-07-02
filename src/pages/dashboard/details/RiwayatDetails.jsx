import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

const RiwayatDetails = () => {
  const [diagnose, setDiagnose] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDiagnoseDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://api-penyakit-manusia.up.railway.app/api/v1/diagnoses/get/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDiagnose(response.data.diagnose);
      } catch (error) {
        console.error("Error fetching diagnosis details:", error);
      }
    };

    fetchDiagnoseDetails();
  }, [id]);

  if (!diagnose) {
    return <p>Loading...</p>;
  }

  const formatTanggal = (tanggalString) => {
    const tanggal = new Date(tanggalString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const tanggalFormatted = tanggal.toLocaleDateString("id-ID", options);
    const jamFormatted = tanggal.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${tanggalFormatted}. ${jamFormatted}`;
  };

  return (
    <div className="notification w-100 overflow-hidden">
      <Row className="wp justify-content-center">
        <div>
          <Container>
            <div className="d-flex justify-content-center mt-4">
              <a href="/dashboard/profiles" className="col-10 fs-6 fw-semibold">
                <FaArrowLeft className="me-3 mb-1 fs-5" />
                Kembali Ke Beranda
              </a>
            </div>
            <div className="d-flex mt-3 justify-content-center">
              <div className="judul mt-4 col-9 d-flex justify-content-center align-items-center">
                <p className="fs-5 text-white text-center mb-0 fw-bold">
                  Detail Riwayat
                </p>
              </div>
            </div>
          </Container>
        </div>
      </Row>
      <Row>
        <div>
          <Container>
            <div className="d-flex justify-content-center">
              <div className="col-9 d-flex justify-content-center">
                <div className="col-lg-12 mt-1">
                  <div className="d-flex">
                    <Col lg="7">
                      <div className="detail-riwayat ms-3">
                        <div className="col-12">
                          <div className="tb mt-3 mb-0 d-flex">
                            <p className="col-4">Diagnosa</p>
                            <p className="me-2">:</p>
                            <p className="col-lg-8">{diagnose.diseases.name}</p>
                          </div>
                          <div className="tb mt-3 mb-0 d-flex">
                            <p className="col-4">Nama Pasien</p>
                            <p className="me-2">:</p>
                            <p className="col-lg-8">{diagnose.name}</p>
                          </div>
                          <div className="tb mt-3 mb-0 d-flex">
                            <p className="col-4">Umur Pasien</p>
                            <p className="me-2">:</p>
                            <p className="col-lg-8">{diagnose.age} tahun</p>
                          </div>
                          <div className="tb mt-3 mb-0 d-flex">
                            <p className="col-4">Jenis Kelamin</p>
                            <p className="me-2">:</p>
                            <p className="col-lg-8">{diagnose.gender}</p>
                          </div>
                          <div className="tb mt-3 mb-0 d-flex">
                            <p className="col-4">Gejala Pasien</p>
                            <p className="me-2">:</p>
                            <p className="col-lg-8">
                              {diagnose.diagnosesTo.map((d, index) => (
                                <span key={index}>
                                  {index > 0 && <br />} {index + 1}.{" "}
                                  {d.symptom.name}
                                </span>
                              ))}
                            </p>
                          </div>
                          <div className="tb mt-3 mb-0 d-flex">
                            <p className="col-4">Tingkat Keparahan</p>
                            <p className="me-2">:</p>
                            <p className="col-lg-8">
                              {diagnose.probabilityResult * 100}%
                            </p>
                          </div>
                          <div className="tb mt-3 mb-0 d-flex">
                            <p className="col-4">Status Diagnosa</p>
                            <p className="me-2">:</p>
                            <p className="col-lg-8">{diagnose.status}</p>
                          </div>
                          <div className="tb mt-3 mb-0 d-flex">
                            <p className="col-4">Waktu Diagnosa</p>
                            <p className="me-2">:</p>
                            <p className="col-lg-8">
                              {formatTanggal(diagnose.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col lg="5" className="me-3 d-flex align-items-center">
                      <div className="col-1"></div>
                      <div className="col-11">
                        <Card.Img
                          variant="top"
                          src={diagnose.diseases.picture}
                          style={{
                            height: "20rem",
                          }}
                        />
                      </div>
                    </Col>
                  </div>
                  <div className="mb-4"></div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Row>
    </div>
  );
};

export default RiwayatDetails;
