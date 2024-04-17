import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const GejalaAdmin = () => {
  const [show, setShow] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
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

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateGejalaData, setUpdateGejalaData] = useState({
    id: null,
    code: null,
    name: null,
  });

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
        "http://localhost:5000/api/v1/symptom/get",
        config
      );

      setGejala(response.data.symptoms);
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
                {/* <th className="col-1">No</th> */}
                <th className="col-2">Kode Gejala</th>
                <th className="col-9">Nama Gejala</th>
                <th className="col-1">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  {/* <td>{item + 1}</td> */}
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>
                    <div className="d-flex">
                      <Button
                        className="update d-flex justify-content-center align-items-center me-1"
                        onClick={() => handleUpdateClick(item.id)}
                      >
                        Ubah
                      </Button>
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

  const handleTambahClick = () => {
    setShow(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/symptom/create",
        {
          code,
          name,
        }
      );

      if (response.status === 200) {
        console.log("Data berhasil disimpan");
        setAlert({
          show: true,
          variant: "success",
          message: "Data berhasil disimpan.",
        });
        handleClose();
        fetchData();
      } else {
        console.log("Gagal menyimpan data");
        setAlert({
          show: true,
          variant: "danger",
          message: "Gagal menyimpan data.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        if (error.response.status === 404) {
          setAlert({
            show: true,
            variant: "danger",
            message: "Not Found",
          });
        } else {
          setAlert({
            show: true,
            variant: "danger",
            message: "Terjadi kesalahan. Mohon coba lagi.",
          });
        }
      } else {
        setAlert({
          show: true,
          variant: "danger",
          message: "Terjadi kesalahan. Mohon coba lagi.",
        });
      }
    }
  };

  const handleUpdateClick = (id) => {
    const gejalaToUpdate = gejala.find((gejala) => gejala.id === id);
    if (gejalaToUpdate) {
      setUpdateGejalaData({
        id: gejalaToUpdate.id,
        code: gejalaToUpdate.code,
        name: gejalaToUpdate.name,
      });
      setShowUpdateModal(true);
    }
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateGejalaData((prevGejalaData) => ({
      ...prevGejalaData,
      [name]: value,
    }));
  };

  // const handlePictureChange = (e) => {
  //   setUpdateGejalaData((prevUserData) => ({
  //     ...prevUserData,
  //     picture: e.target.files[0],
  //   }));
  // };

  const handleFormUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("code", updateGejalaData.code);
      formData.append("name", updateGejalaData.name);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:5000/api/v1/symptom/update/${updateGejalaData.id}`,
        formData,
        config
      );

      if (response.status === 200) {
        console.log("Data berhasil diupdate");
        setAlert({
          show: true,
          variant: "success",
          message: "Data berhasil diupdate.",
        });
        setShowUpdateModal(false);
        fetchData();
      } else {
        console.log("Gagal mengupdate data");
        setAlert({
          show: true,
          variant: "danger",
          message: "Gagal mengupdate data.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        if (error.response.status === 404) {
          setAlert({
            show: true,
            variant: "danger",
            message: "Not Found",
          });
        } else {
          setAlert({
            show: true,
            variant: "danger",
            message: "Terjadi kesalahan. Mohon coba lagi.",
          });
        }
      } else {
        setAlert({
          show: true,
          variant: "danger",
          message: "Terjadi kesalahan. Mohon coba lagi.",
        });
      }
    }
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
        `http://localhost:5000/api/v1/symptom/delete/${deleteConfirmation.idToDelete}`,
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
      {/* TAMBAH DATA */}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Title className="fw-semibold text-center">
          Tambah Data Gejala
        </Modal.Title>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-9">
              <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3" control="code">
                    <Form.Label className="fw-semibold">Kode Gejala</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Kode Gejala..."
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" control="name">
                    <Form.Label className="fw-semibold">Nama Gejala</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Gejala..."
                      required
                    />
                  </Form.Group>
                  <Button className="save mb-4 fw-bold" type="submit">
                    Simpan
                  </Button>
                </Form>
              </Modal.Body>
            </div>
          </div>
        </div>
      </Modal>

      {/* UPDATE DATA */}
      <Modal
        size="lg"
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Title className="fw-semibold text-center">
          Update Data Gejala
        </Modal.Title>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-9">
              <Modal.Body>
                <Form onSubmit={handleFormUpdate}>
                  <Form.Group className="mb-3" controlId="code">
                    <Form.Label className="fw-semibold">Kode Gejala</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="code"
                      value={updateGejalaData.code}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label className="fw-semibold">Nama Gejala</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="name"
                      value={updateGejalaData.name}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </Form.Group>
                  <Button className="save mb-4 fw-bold" type="submit">
                    Simpan
                  </Button>
                </Form>
              </Modal.Body>
            </div>
          </div>
        </div>
      </Modal>

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
          <h5 className="mt-2 fw-bold text-black col-4">Daftar Gejala</h5>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <Button
              className="tambah me-2 fw-semibold d-flex align-items-center"
              onClick={handleTambahClick}
            >
              <FaPlus className="me-2" />
              Tambah Gejala
            </Button>
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

export default GejalaAdmin;
