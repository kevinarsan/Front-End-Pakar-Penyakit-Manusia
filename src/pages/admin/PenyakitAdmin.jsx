import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const PenyakitAdmin = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [picture, setPicture] = useState(null);
  const [solution, setSolution] = useState("");
  const [probability, setProbability] = useState("");
  const [penyakit, setPenyakit] = useState([]);
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
  const [updateHospitalsData, setUpdateHospitalData] = useState({
    id: null,
    code: "",
    name: "",
    picture: null,
    solution: "",
    probability: "",
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
        "http://localhost:5000/api/v1/diseases/get",
        config
      );

      setPenyakit(response.data.disease);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderTable = () => {
    const totalPages = Math.ceil(penyakit.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = penyakit.slice(indexOfFirstItem, indexOfLastItem);

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
                <th className="col-1">No</th>
                <th className="col-1">KD Gejala</th>
                <th className="col-2">Nama Gejala</th>
                <th className="col-1">Picture</th>
                <th className="col-5">Solusi</th>
                <th className="col-1">Probabilitas</th>
                <th className="col-1">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.picture}
                      alt={item.name}
                      style={{ height: "50px", width: "50px" }}
                    />
                  </td>
                  <td>{item.solution}</td>
                  <td>{item.probability}</td>
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
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("code", code);
      formData.append("name", name);
      formData.append("picture", picture);
      formData.append("solution", solution);
      formData.append("probability", probability);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/diseases/create",
        formData,
        config
      );

      if (response.status === 200) {
        console.log("Data berhasil disimpan");
        setAlert({
          show: true,
          variant: "success",
          message: "Data berhasil disimpan",
        });
        handleClose();
        fetchData();
      } else {
        console.log("Gagal menyimpan data");
        setAlert({
          show: true,
          variant: "danger",
          message: "Gagal menyimpan data",
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
  };

  const handleUpdateClick = (id) => {
    const penyakitToUpdate = penyakit.find((penyakit) => penyakit.id === id);
    if (penyakitToUpdate) {
      setUpdateHospitalData({
        id: penyakitToUpdate.id,
        code: penyakitToUpdate.code,
        name: penyakitToUpdate.name,
        picture: null,
        solution: penyakitToUpdate.solution,
        probability: penyakitToUpdate.probability,
      });
      setShowUpdateModal(true);
    }
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateHospitalData((prevHospitalsData) => ({
      ...prevHospitalsData,
      [name]: value,
    }));
  };

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handlePictureUpdate = (e) => {
    setUpdateHospitalData((prevHospitalData) => ({
      ...prevHospitalData,
      picture: e.target.files[0],
    }));
  };

  const handleFormUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", updateHospitalsData.name);
      formData.append("code", updateHospitalsData.code);
      if (updateHospitalsData.picture) {
        formData.append("picture", updateHospitalsData.picture);
      }
      formData.append("solution", updateHospitalsData.solution);
      formData.append("probability", updateHospitalsData.probability);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:5000/api/v1/diseases/update/${updateHospitalsData.id}`,
        formData,
        config
      );

      if (response.status === 200) {
        console.log("Data berhasil diupdate");
        setAlert({
          show: true,
          variant: "success",
          message: "Data berhasil diupdate",
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
      setAlert({
        show: true,
        variant: "danger",
        message: "Terjadi kesalahan. Mohon coba lagi.",
      });
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
        `http://localhost:5000/api/v1/diseases/delete/${deleteConfirmation.idToDelete}`,
        config
      );

      if (response.status === 200) {
        console.log("Data berhasil dihapus");
        setAlert({
          show: true,
          variant: "success",
          message: "Data berhasil dihapus",
        });
        fetchData();
      } else {
        console.log("Gagagl menghapus data.");
        setAlert({
          show: true,
          variant: "danger",
          message: "Gagagl menghapus data",
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
          Tambah Data Penyakit
        </Modal.Title>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-9">
              <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                  {/* <Form.Group className="mb-3" control="code">
                    <Form.Label className="fw-semibold">Kota</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Code Penyakir..."
                      required
                    />
                  </Form.Group> */}
                  <Form.Group className="mb-3" control="name">
                    <Form.Label className="fw-semibold">
                      Nama Penyakit
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Penyakit..."
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" control="picture">
                    <Form.Label className="fw-semibold">Picture</Form.Label>
                    <Form.Control
                      size="lg"
                      type="file"
                      name="picture"
                      onChange={handlePictureChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" control="solution">
                    <Form.Label className="fw-semibold">Solusi</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="solution"
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      placeholder="Solusi..."
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" control="probability">
                    <Form.Label className="fw-semibold">
                      Nilai Probabilitas
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="probability"
                      value={probability}
                      onChange={(e) => setProbability(e.target.value)}
                      placeholder="Nilai Probabilitas..."
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
          Update Data Penyakit
        </Modal.Title>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-9">
              <Modal.Body>
                <Form onSubmit={handleFormUpdate}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label className="fw-semibold">
                      Nama Penyakit
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="name"
                      value={updateHospitalsData.name}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="picture">
                    <Form.Label className="fw-semibold">Picture</Form.Label>
                    <Form.Control
                      size="lg"
                      type="file"
                      name="picture"
                      onChange={handlePictureUpdate}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="solution">
                    <Form.Label className="fw-semibold">Solusi</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="solution"
                      value={updateHospitalsData.solution}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="probability">
                    <Form.Label className="fw-semibold">
                      Nilai Probabilitas
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="probability"
                      value={updateHospitalsData.probability}
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

      {/* CONFIRMATION DELETE */}
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
          <h5 className="mt-2 fw-bold text-black col-4">Data Penyakit</h5>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <Button
              className="tambah me-2 fw-semibold d-flex align-items-center"
              onClick={handleTambahClick}
            >
              <FaPlus className="me-2" />
              Tambah Penyakit
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

export default PenyakitAdmin;
