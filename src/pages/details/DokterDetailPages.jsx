// DetailDokter.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const DetailDokterPages = () => {
  const { id } = useParams();
  const [detailDokter, setDetailDokter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/reviews/overal/${id}`
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

  return (
    <div>
      <Link to="/daftar-dokter">
        <FaArrowLeft />
      </Link>
      <h1>{detailDokter.name}</h1>
    </div>
  );
};

export default DetailDokterPages;
