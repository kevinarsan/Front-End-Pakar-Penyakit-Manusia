import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const ContactKami = () => {
  const [motoData, setMotoData] = useState([]);
  const [contactkData, setContactData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMoto = await axios.get(
          "http://localhost:5000/api/v1/about/description-team"
        );

        const motoItams = responseMoto.data.about.filter(
          (item) => item.name === "Kontak Kami"
        );

        setMotoData(motoItams);

        const responsecontact = await axios.get(
          "http://localhost:5000/api/v1/about/contact"
        );

        setContactData(responsecontact.data.contacts);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="kontak w-100 overflow-hidden">
      <Row className="wp mb-3">
        <Col>
          {motoData.map((item) => (
            <div key={item.id}>
              <h1 className="text-center">{item.name}</h1>
              <div className="d-flex justify-content-center mt-1">
                <p className="text-center w-50 fs-5">{item.description}</p>
              </div>
            </div>
          ))}
        </Col>
      </Row>

      <Container className="d-flex justify-content-center mb-3">
        <Col lg="5">
          <Row className="bg-kontak d-flex justify-content-center">
            <div className="mt-5 mb-5 ms-5 col-9">
              {contactkData.map((item) => (
                <div className="mb-3" key={item.id}>
                  <h5 className="fw-bold">{item.name}</h5>
                  <h6>{item.email}</h6>
                </div>
              ))}
            </div>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default ContactKami;
//
