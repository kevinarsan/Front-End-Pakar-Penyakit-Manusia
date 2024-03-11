import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, NavDropdown } from "react-bootstrap";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";

const AboutAdmin = () => {
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("Visi & Misi");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";

        if (dataType === "Visi & Misi") {
          url = "http://localhost:5000/api/v1/about/visi-misi";
        } else if (dataType === "Teams") {
          url = "http://localhost:5000/api/v1/about/teams";
        } else if (dataType === "Moto") {
          url = "http://localhost:5000/api/v1/about/description-team";
        }

        const response = await axios.get(url);

        if (response.status === 200) {
          setData(response.data[dataType.toLowerCase()] || []);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataType]);

  const renderTable = () => {
    if (!data || data.length === 0) {
      return <p>Data tidak ditemukan</p>;
    }

    return (
      <div className="table-admin overflow-auto">
        <Table>
          {/*... Table Header ...*/}
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {/*... Table Rows ...*/}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <div className="col-10 offset-1 mt-4">
      <div className="d-flex mb-2">
        {/*... Dropdown for selecting data type ...*/}
      </div>
      {renderTable()}
    </div>
  );
};

export default AboutAdmin;
