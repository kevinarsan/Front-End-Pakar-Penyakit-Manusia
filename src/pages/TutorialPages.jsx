import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const TutorialPages = () => {
  const [videoData, setVideoData] = useState([]);
  const [motoData, setMotoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMoto = await axios.get(
          "https://api-penyakit-manusia.up.railway.app/api/v1/about/description-team"
        );

        const motoItems = responseMoto.data.about.filter(
          (item) => item.name === "Tutorial"
        );

        setMotoData(motoItems);

        const responseVideo = await axios.get(
          "https://api-penyakit-manusia.up.railway.app/api/v1/about/tutorials"
        );
        setVideoData(responseVideo.data.videos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getYoutubeEmbedLink = (url) => {
    try {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      console.error("Error parsing YouTube URL:", error);
      return "";
    }
  };
  return (
    <div className="tutorial w-100 overflow-hidden">
      <Row className="mb-5">
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

      <Row>
        <Col className="d-flex justify-content-center align-items-center mb-5">
          <div className="video w-75 text-center">
            <h4 className="fw-semibold mt-5 mb-5">Tutorial Penggunaan</h4>
            {videoData.map((item) => (
              <div key={item.id}>
                <iframe
                  className="col-9"
                  title={`Video Tutorial ${item.id}`}
                  src={getYoutubeEmbedLink(item.linkVideo)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <h3 className="offset-1 col-10 text-start mt-5 mb-3 fw-bold">
                  Deskripsi
                </h3>
                <p className="offset-1 col-10 text-start mb-5">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TutorialPages;
