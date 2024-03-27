import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const HospitalsAdmin = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState(null);
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [hospitals, setHospitals] = useState([]);
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
    name: "",
    picture: null,
    city: "",
    province: "",
    country: "",
    details: "",
    location: "",
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
        "http://localhost:5000/api/v1/hospitals/get",
        config
      );

      setHospitals(response.data.hospitals);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderTable = () => {
    const totalPages = Math.ceil(hospitals.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = hospitals.slice(indexOfFirstItem, indexOfLastItem);

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
              <tr className="hospital">
                <th className="col-3">Nama Rumah Sakit</th>
                <th className="col-1">Gambar</th>
                <th className="col-1">Kota</th>
                <th className="col-1">Provinsi</th>
                <th className="col-1">Negara</th>
                <th className="col-3">Detail Lokasi</th>
                <th className="col-2">Link Google Maps</th>
                <th className="col-1">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.picture}
                      alt={item.name}
                      style={{ height: "50px", width: "50px" }}
                    />
                  </td>
                  <td>{item.city}</td>
                  <td>{item.province}</td>
                  <td>{item.country}</td>
                  <td>{item.details}</td>
                  <td>{item.location}</td>
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
      formData.append("name", name);
      formData.append("picture", picture);
      formData.append("city", city);
      formData.append("province", province);
      formData.append("country", country);
      formData.append("details", details);
      formData.append("location", location);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/hospitals/create",
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
    const hospitalToUpdate = hospitals.find((hospital) => hospital.id === id);
    if (hospitalToUpdate) {
      setUpdateHospitalData({
        id: hospitalToUpdate.id,
        name: hospitalToUpdate.name,
        picture: null,
        city: hospitalToUpdate.city,
        province: hospitalToUpdate.province,
        country: hospitalToUpdate.country,
        details: hospitalToUpdate.details,
        location: hospitalToUpdate.location,
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
      if (updateHospitalsData.picture) {
        formData.append("picture", updateHospitalsData.picture);
      }
      formData.append("city", updateHospitalsData.city);
      formData.append("province", updateHospitalsData.province);
      formData.append("country", updateHospitalsData.country);
      formData.append("details", updateHospitalsData.details);
      formData.append("location", updateHospitalsData.location);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:5000/api/v1/hospitals/update/${updateHospitalsData.id}`,
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
        `http://localhost:5000/api/v1/hospitals/delete/${deleteConfirmation.idToDelete}`,
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold">
            Tambah Data Rumah Sakit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" control="name">
              <Form.Label>Nama Rumah Sakit</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" control="picture">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                name="picture"
                onChange={handlePictureChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" control="city">
              <Form.Label>Kota</Form.Label>
              <Form.Control
                type="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" control="province">
              <Form.Label>Provinsi</Form.Label>
              <Form.Control
                type="text"
                name="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" control="country">
              <Form.Label>Negara</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" control="details">
              <Form.Label>Detail Alamat</Form.Label>
              <Form.Control
                type="text"
                name="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" control="location">
              <Form.Label>Lokasi Google Maps</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="save" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* UPDATE DATA */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold">Update Data Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <Form onSubmit={handleFormUpdate}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nama Rmah Sakit</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updateHospitalsData.name}
                onChange={handleUpdateInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="picture">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                name="picture"
                onChange={handlePictureUpdate}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>Kota</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={updateHospitalsData.city}
                onChange={handleUpdateInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="province">
              <Form.Label>Provinsi</Form.Label>
              <Form.Control
                type="text"
                name="province"
                value={updateHospitalsData.province}
                onChange={handleUpdateInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Negara</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={updateHospitalsData.country}
                onChange={handleUpdateInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="details">
              <Form.Label>Alamat Detail</Form.Label>
              <Form.Control
                type="text"
                name="details"
                value={updateHospitalsData.details}
                onChange={handleUpdateInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Lokasi Google Maps</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={updateHospitalsData.location}
                onChange={handleUpdateInputChange}
                required
              />
            </Form.Group>
            <Button className="save" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
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
          <Button className="cencel" onClick={handleDeleteConfirmationClose}>
            Batal
          </Button>
          <Button className="hapus" onClick={handleDeleteConfirmed}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="col-10 offset-1 mt-4">
        <div className="d-flex mb-1">
          <h5 className="mt-2 fw-bold text-black col-4">Daftar Hospital</h5>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <Button
              className="tambah me-2 fw-semibold d-flex align-items-center"
              onClick={handleTambahClick}
            >
              <FaPlus className="me-2" />
              Tambah Users
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

export default HospitalsAdmin;
