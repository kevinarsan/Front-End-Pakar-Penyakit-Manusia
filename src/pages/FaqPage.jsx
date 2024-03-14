import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Container, Col, NavDropdown, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const FaqPage = () => {
  const [dataFaq, setDataFaq] = useState([]);
  const [motoData, setMotoData] = useState([]);
  const [language, setLanguage] = useState("Bahasa Indonesia");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMoto = await axios.get(
          "http://localhost:5000/api/v1/about/description-team"
        );

        const motoItems = responseMoto.data.about.filter(
          (item) => item.name === "FAQ"
        );

        setMotoData(motoItems);

        const responseFaq = await axios.get(
          "http://localhost:5000/api/v1/about/faq"
        );
        setDataFaq(responseFaq.data.FAQ);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChangeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const toggleAnswer = (index) => {
    const newDataFaq = [...dataFaq];
    newDataFaq[index].showAnswer = !newDataFaq[index].showAnswer;
    setDataFaq(newDataFaq);
  };

  return (
    <div className="faq w-100 overflow-hidden">
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

      <Container>
        <Row className="d-flex justify-content-center">
          <Col lg="10">
            <h3 className="mb-3 fw-bold">Frequently Asked Question</h3>
            <div className="d-flex">
              <Col lg="8" className="d-flex align-items-center">
                <div>
                  <h6 className=" me-4 fw-bold">Pilih Bahasa</h6>
                </div>
                <div className="faq-language mb-2 d-flex align-items-center">
                  <NavDropdown
                    className="fs-6 col-4 mb-2 mt-2 me-4 ms-4"
                    title={language}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item
                      onClick={() => handleChangeLanguage("Bahasa Indonesia")}
                    >
                      Bahasa Indonesia
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleChangeLanguage("Bahasa Inggris")}
                    >
                      Bhasa Inggris
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </Col>
              <Col lg="4">
                <div className="d-flex justify-content-end align-items-center">
                  <Form className="d-flex col-9 justify-content-end align-items-center">
                    <Form.Control
                      type="search"
                      placeholder="  Cari..."
                      className=" fs-6"
                      aria-label="Search"
                    />
                    <div className="search ms-2">
                      <Link to="#">
                        <BiSearchAlt className=" text-white fs-4" />
                      </Link>
                    </div>
                  </Form>
                </div>
              </Col>
            </div>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col lg="10">
            <div className="mb-5 mt-3">
              <div className="faq-sify p-5">
                {dataFaq.map((item, index) => (
                  <div className="border-faq" key={item.id}>
                    <div
                      className="d-flex mt-2 mb-2"
                      onClick={() => toggleAnswer(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="col-11">
                        <h5 className="fw-normal">{item.pertanyaan} </h5>
                      </div>
                      <div
                        className="d-flex justify-content-end col-1 fs-5"
                        style={{ color: "#4a4a4a" }}
                      >
                        {item.showAnswer ? <FaAngleUp /> : <FaAngleDown />}
                      </div>
                    </div>
                    {item.showAnswer && <p>{item.jawaban}</p>}
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FaqPage;
