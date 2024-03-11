import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, NavDropdown, Modal, Form } from "react-bootstrap";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";

const AboutAdmin = () => {
  // // Modal
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // data api
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
          setData(
            response.data.existingVisi ||
              response.data.teams ||
              response.data.about ||
              []
          );
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
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
          <thead>
            <tr>
              <th className="">No</th>
              {dataType === "Visi & Misi" ? (
                <>
                  <th className="col-1">Visi/Misi</th>
                  <th className="col-3">Tujuan</th>
                  <th className="col-6">Description</th>
                </>
              ) : dataType === "Teams" ? (
                <>
                  <th className="col-2">Nama</th>
                  <th className="col-2">Foto</th>
                  <th className="col-6">Description</th>
                </>
              ) : dataType === "Moto" ? (
                <>
                  <th className="col-10">Description</th>
                </>
              ) : null}
              <th className="col-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {dataType === "Visi & Misi" ? (
                  <>
                    <td>{item.name}</td>
                    <td>{item.bab}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="d-flex">
                        <Button className="update d-flex justify-content-center align-items-center me-1">
                          Ubah
                        </Button>
                        <Button className="delete d-flex justify-content-center align-items-center ms-1">
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </>
                ) : dataType === "Teams" ? (
                  <>
                    <td>{item.name}</td>
                    <td>
                      <img
                        className="w-100"
                        src={item.picture}
                        alt={item.name}
                      />
                    </td>
                    <td>{item.description}</td>
                    <td>
                      <div className="d-flex">
                        <Button className="update d-flex justify-content-center align-items-center me-1">
                          Ubah
                        </Button>
                        <Button className="delete d-flex justify-content-center align-items-center ms-1">
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </>
                ) : dataType === "Moto" ? (
                  <>
                    <td>{item.description}</td>
                    <td>
                      <div className="d-flex">
                        <Button className="update d-flex justify-content-center align-items-center me-1">
                          Ubah
                        </Button>
                        <Button className="delete d-flex justify-content-center align-items-center ms-1">
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </>
                ) : null}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  const renderButton = () => {
    let text = "";
    if (dataType === "Visi & Misi") {
      text = "Tambah Visi & Misi";
    } else if (dataType === "Teams") {
      text = "Tambah Teams";
    } else if (dataType === "Moto") {
      text = "Tambah Moto";
    }

    return (
      <>
        <Button
          className="tambah me-2 fw-semibold d-flex align-items-center"
          onClick={() => handleTambahClick(dataType)}
        >
          <FaPlus className="me-2" />
          {text}
        </Button>
      </>
    );
  };

  const handleTambahClick = (dataType) => {
    console.log(`Tambah ${dataType} clicked`);
  };

  return (
    <div className="col-10 offset-1 mt-4">
      <div className="d-flex mb-2">
        <NavDropdown
          className="mt-2 fs-5 fw-bold text-black col-4"
          title={dataType}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item onClick={() => setDataType("Visi & Misi")}>
            Visi & Misi
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setDataType("Teams")}>
            Teams
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setDataType("Moto")}>
            Moto
          </NavDropdown.Item>
        </NavDropdown>
        <div className="col-8 d-flex justify-content-end mt-2">
          {renderButton()}
          <Button className="filter me-2 ms-2 fw-semibold d-flex align-items-center">
            <FaFilter className="me-2" />
            Filter
          </Button>
          <FaSearch className="logo-search fs-5 ms-1 d-flex align-items-center mt-1" />
        </div>
      </div>
      {renderTable()}
    </div>
  );
};

export default AboutAdmin;
