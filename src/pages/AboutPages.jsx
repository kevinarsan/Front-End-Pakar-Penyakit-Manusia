import React, { useState, useEffect } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

const AboutPage = () => {
  const [language, setLanguage] = useState("ID");
  const [visiData, setVisiData] = useState([]);
  const [misiData, setMisiData] = useState([]);
  const [descriptionTeam, setDescriptionTeam] = useState([]);
  const [teamData, setTeamData] = useState([]);

  const handleSwitchChange = () => {
    setLanguage((prevLanguage) => (prevLanguage === "ID" ? "EN" : "ID"));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/about/visi-misi"
        );

        const visiItems = response.data.existingVisi.filter(
          (item) => item.name === "Visi"
        );

        const misiItems = response.data.existingVisi.filter(
          (item) => item.name === "Misi"
        );

        setVisiData(visiItems[0] || {});
        setMisiData(misiItems);

        const responsee = await axios.get(
          "http://localhost:5000/api/v1/about/description-team"
        );
        const motoItems = responsee.data.about.filter(
          (item) => item.name === "Our Team"
        );

        setDescriptionTeam(motoItems);

        const responseTeam = await axios.get(
          "http://localhost:5000/api/v1/about/teams"
        );
        setTeamData(responseTeam.data.teams);
      } catch (error) {
        console.error("Error fetching visi-misi data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="about w-100 overflow-hidden">
      <Row className="translete">
        <Col>
          <h1 className="text-center">About Us</h1>
          <Form.Check
            type="switch"
            id="custom-switch"
            className="fs-2 text-center"
            onChange={handleSwitchChange}
          />
          {/* <label htmlFor="custom-switch" className="fs-2 text-center me-2">
            {" "}
            {language === "ID" ? "ID" : ""}{" "}
          </label>{" "}
          <label htmlFor="custom-switch" className="fs-2 text-center">
            {" "}
            {language === "EN" ? "EN" : ""}{" "}
          </label>{" "} */}
        </Col>
      </Row>

      <Container className="mb-2 mt-2">
        <Row className="mb-5">
          <Col className="mb-3 mt-3 d-flex justify-content-center align-items-center">
            <div className="moto text-center mb-3 mt-3 fs-2 col-11">
              Seiring berjalannya waktu, <i>Diagnosify</i> telah menetapkan
              nilai- nilai dan tujuan yang tercermin dalam visi dan misinya.
              Kristalisasi nilai dan tujuan ini diharapkan menjadi dasar bagi
              <i> Diagnosify</i> serta semua pihak yang terlibat, mulai dari
              Dokter hingga pasien.
            </div>
          </Col>
        </Row>

        <Row className="">
          <Col lg="6" className="text-center">
            <h1 className="fw-semibold mb-3">Visi</h1>
            <h5 className="mb-1">{visiData.bab}</h5>
            <p className="mb-3">{visiData.description}</p>
          </Col>

          <Col lg="6" className="text-center">
            <h1 className="fw-semibold mb-3">Misi</h1>
            {misiData.map((item) => (
              <div key={item.id}>
                <h5 className="mb-1">{item.bab}</h5>
                <p className="mb-3">{item.description}</p>
              </div>
            ))}
          </Col>
        </Row>

        {descriptionTeam.map((item) => (
          <Row
            key={item.id}
            className="mt-4 mb-5 d-flex justify-content-center"
          >
            <Col lg="10" className="text-center">
              <h1 className="fw-semibold mb-3">{item.name}</h1>
              <p className="fs-5">{item.description}</p>
            </Col>
          </Row>
        ))}

        {teamData.map((item) => (
          <Row key={item.id}>
            <Col lg="6" className="pt-lg-0 mx-auto text-center">
              <img src={item.picture} alt="" className="mb-5 w-100" />
            </Col>

            <Col lg="6" className="align-self-center">
              <h1 className="fw-semibold">{item.name}</h1>
              <p className="mx-auto">{item.description}</p>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default AboutPage;
