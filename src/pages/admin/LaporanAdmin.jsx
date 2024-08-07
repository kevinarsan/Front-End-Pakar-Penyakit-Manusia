import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import {
  FaAnglesLeft,
  FaAnglesRight,
  FaCircleCheck,
  FaXmark,
} from "react-icons/fa6";

const LaporanAdmin = () => {
  const [show, setShow] = useState(false);
  const [gejala, setGejala] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    variant: "success",
    message: "",
  });

  const handleClose = () => {
    setShow(false);
    setAlert({ show: false, variant: "success", message: "" });
  };

  const handleShow = () => setShow(true);

  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    idToDelete: null,
  });

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmation({ show: false, idToDelete: null });
  };

  const handleDeleteConfirmationShow = (id) => {
    setDeleteConfirmation({ show: true, idToDelete: id });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "https://api-penyakit-manusia.up.railway.app/api/v1/diagnoses/get",
        config
      );

      setGejala(response.data.diagnose);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderTable = () => {
    const totalPages = Math.ceil(gejala.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = gejala.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    return (
      <div>
        <div className="table-admin overflow-auto">
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th style={{ minWidth: "10rem" }}>Nama Pasien</th>
                <th style={{ minWidth: "7rem" }}>Umur</th>
                <th style={{ minWidth: "7rem" }}>Jenis Kelamin</th>
                <th style={{ minWidth: "7rem" }}>Nama Penyakit</th>
                <th>Nama Gejala</th>
                <th>Probabilitas</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.age} Bulan</td>
                  <td>{item.gender}</td>
                  <td>{item.diseases.name}</td>
                  <td>
                    {item.diagnosesTo.map((diagnose, idx) => (
                      <div key={idx} className="mb-1">
                        <FaCircleCheck className="mb-1" />{" "}
                        {diagnose.symptom.name}
                      </div>
                    ))}
                  </td>
                  <td>{item.probabilityResult.toFixed(2)}</td>
                  <td>
                    {item.status} {item.diseases.name}
                  </td>
                  <td>
                    <div className="d-flex">
                      <Button
                        className="delete d-flex justify-content-center align-items-center ms-1"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="pagination mt-3 d-flex justify-content-end">
          <Button
            className="me-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <FaAnglesLeft />
          </Button>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            className="ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FaAnglesRight />
          </Button>
        </div>
      </div>
    );
  };

  const handleDeleteClick = async (id) => {
    handleDeleteConfirmationShow(id);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `https://api-penyakit-manusia.up.railway.app/api/v1/diagnoses/delete/${deleteConfirmation.idToDelete}`,
        config
      );

      if (response.status === 200) {
        console.log("Data berhasil dihapus");
        setAlert({
          show: true,
          variant: "success",
          message: "Data berhasil dihapus.",
        });
        fetchData();
      } else {
        console.log("Gagal menghapus data");
        setAlert({
          show: true,
          variant: "danger",
          message: "Gagal menghapus data.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        show: true,
        variant: "danger",
        message: "Terjadi kesalahan. Mohon coba lagi.",
      });
    }

    handleDeleteConfirmationClose();
  };

  return (
    <div>
      {/* CORFIRMATION DELETE */}
      <Modal
        show={deleteConfirmation.show}
        onHide={handleDeleteConfirmationClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold">
            Konfirmasi Penghapusan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Yakin ingin menghapus data?</Modal.Body>
        <Modal.Footer>
          <Button
            className="cencel fw-bold"
            onClick={handleDeleteConfirmationClose}
          >
            Batal
          </Button>
          <Button className="hapus fw-bold" onClick={handleDeleteConfirmed}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>

      {/* GET DATA */}
      <div className="col-10 offset-1 mt-4">
        <Alert
          show={alert.show}
          variant={alert.variant}
          onClose={() =>
            setAlert({ show: false, variant: "success", message: "" })
          }
          dismissible
        >
          {alert.message}
        </Alert>
        <div className="d-flex mb-1">
          <h5 className="mt-2 fw-bold text-black col-4">Laporan Diagnosa</h5>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <Button className="filter me-2 ms-2 fw-semibold d-flex align-items-center">
              <FaFilter className="me-2" />
              Filter
            </Button>
            <FaSearch className="logo-search fs-5 ms-2" />
          </div>
        </div>
        {renderTable()}
      </div>
    </div>
  );
};

export default LaporanAdmin;
