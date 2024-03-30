import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  NavDropdown,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";

const UserActive = () => {
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("Daftar Dokter Aktif");
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

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    phone: "",
    picture: null,
    spesialis: "",
    description: "",
    aboutUs: "",
    city: "",
    province: "",
    country: "",
    details: "",
    days: "",
    open: "",
    close: "",
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateUserData, setUpdateUserData] = useState({
    id: null,
    username: "",
    email: "",
    name: "",
    phone: "",
    picture: null,
    spesialis: "",
    description: "",
    aboutUs: "",
    city: "",
    province: "",
    country: "",
    details: "",
    days: "",
    open: "",
    close: "",
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
  const [totalPages, setTotalPages] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  useEffect(() => {
    fetchData();
  }, [dataType, selectedData]);

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
    setStartIndex((currentPage - 1) * itemsPerPage);
    setEndIndex(currentPage * itemsPerPage);
  }, [data, currentPage]);

  const fetchData = async () => {
    try {
      let url = "";

      if (dataType === "Daftar Dokter Aktif") {
        url = "http://localhost:5000/api/v1/profiles/get";
      } else if (dataType === "Daftar Praktek Dokter") {
        url = "http://localhost:5000/api/v1/practice/get";
      }

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(url, config);

      if (response.status === 200) {
        if (dataType === "Daftar Dokter Aktif") {
          setData(
            response.data.userGet.filter((item) => item.role === "dokter") || []
          );
        } else if (dataType === "Daftar Praktek Dokter") {
          setData(response.data.existingPractice || []);
        }
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const renderTable = () => {
    if (!data || data.length === 0) {
      return <p>Data tidak ditemukan</p>;
    }

    const currentData = data.slice(startIndex, endIndex);

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
        {" "}
        <div className="table-admin overflow-auto">
          <Table>
            <thead>
              <tr>
                {dataType === "Daftar Dokter Aktif" ? (
                  <>
                    <th>Username</th>
                    <th style={{ minWidth: "13rem" }}>Email</th>
                    <th style={{ minWidth: "8rem" }}>Nama Dokter</th>
                    <th>Phone</th>
                    <th>Picture</th>
                    <th>Spesialis</th>
                    <th style={{ minWidth: "13rem" }}>Deskripsi</th>
                    <th style={{ minWidth: "17rem" }}>Tentang Dokter</th>
                    <th style={{ minWidth: "10rem" }}>Alamat</th>
                  </>
                ) : dataType === "Daftar Praktek Dokter" ? (
                  <>
                    <th className="col-2">Hari</th>
                    <th className="col-2">Jam Buka</th>
                    <th className="col-6">Jam Tutup</th>
                  </>
                ) : null}
                <th className="col-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  {dataType === "Daftar Dokter Aktif" ? (
                    <>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.profile && item.profile.name}</td>
                      <td>{item.profile && item.profile.phone}</td>
                      <td>
                        <img
                          src={item.profile && item.profile.picture}
                          alt={item.username}
                          style={{ height: "50px", width: "50px" }}
                        />
                      </td>
                      <td>{item.profile && item.profile.spesialis}</td>
                      <td>{item.profile && item.profile.description}</td>
                      <td>{item.profile && item.profile.aboutUs}</td>
                      <td>
                        {item.profile && item.profile.city},{" "}
                        {item.profile && item.profile.province},{" "}
                        {item.profile && item.profile.country},{" "}
                        {item.profile && item.profile.details}
                      </td>
                      <td>
                        <div className="d-flex">
                          <Button
                            className="update d-flex justify-content-center align-items-center me-1"
                            onClick={() => handleUpdateClick(item)}
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
                    </>
                  ) : dataType === "Daftar Praktek Dokter" ? (
                    <>
                      <td>{item.days}</td>
                      <td>{item.open}</td>
                      <td>{item.close}</td>
                      <td>
                        <div className="d-flex">
                          <Button
                            className="update d-flex justify-content-center align-items-center me-1"
                            onClick={() => handleUpdateClick(item)}
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
                    </>
                  ) : null}
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

  const handleTambahClick = (dataType) => {
    setSelectedData(null);
    setFormData({
      username: "",
      email: "",
      name: "",
      phone: "",
      role: "dokter",
      password: "",
      picture: null,
      spesialis: "",
      description: "",
      aboutUs: "",
      city: "",
      province: "",
      country: "",
      details: "",
      days: "",
      open: "",
      close: "",
    });

    handleShow();
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let url = "";
    let config = {};

    if (dataType === "Daftar Dokter Aktif") {
      url = "http://localhost:5000/api/v1/auth/register-admin";
      config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    } else if (dataType === "Daftar Praktek Dokter") {
      url = "http://localhost:5000/api/v1/practice/create";
      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
    }

    try {
      let response;

      if (dataType === "Daftar Dokter Aktif") {
        formData.role = "dokter";
        response = await axios.post(url, formData, config);
      } else if (dataType === "Daftar Praktek Dokter") {
        response = await axios.post(url, formData, config);
      }

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
      setAlert({
        show: true,
        variant: "danger",
        message: "Terjadi kesalahan. Mohon coba lagi.",
      });
    }
  };

  const renderButton = () => {
    let text = "";
    if (dataType === "Daftar Dokter Aktif") {
      text = "Tambah Data Dokter";
    } else if (dataType === "Daftar Praktek Dokter") {
      text = "Tambah Daftar Praktek Dokter";
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

  const renderFormFields = () => {
    if (dataType === "Daftar Dokter Aktif") {
      return (
        <>
          <Form.Group className="mb-3 mt-4" control="username">
            <Form.Label className="fw-semibold">Username</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              required
              placeholder="Username..."
            />
          </Form.Group>
          <Form.Group className="mb-3" control="email">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Email..."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" control="password">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              placeholder="Password..."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" control="phone">
            <Form.Label className="fw-semibold">No Telepon</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              placeholder="Phone..."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" control="role">
            <Form.Label className="fw-semibold">Role</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              name="role"
              value={formData.role}
              onChange={handleFormChange}
              required
            >
              <option value="dokter">Dokter</option>
            </Form.Control>
          </Form.Group>
        </>
      );
    } else if (dataType === "Daftar Praktek Dokter") {
      return (
        <>
          <Form.Group className="mb-3" control="days">
            <Form.Label className="fw-semibold">Hari</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="days"
              value={formData.days}
              onChange={handleFormChange}
              placeholder="Text..."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" control="open">
            <Form.Label className="fw-semibold">Jam Buka</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="open"
              value={formData.open}
              onChange={handleFormChange}
              placeholder="Text..."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" control="close">
            <Form.Label className="fw-semibold">Jam Tutup</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="close"
              value={formData.close}
              onChange={handleFormChange}
              placeholder="Text..."
              required
            />
          </Form.Group>
        </>
      );
    }
  };

  const handleUpdateFormChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      setUpdateUserData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setUpdateUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdateClick = (item) => {
    setUpdateUserData({
      id: item.id,
      username: item.username,
      email: item.email,
      name: item.profile && item.profile.name,
      phone: item.profile && item.profile.phone,
      picture: item.profile && item.profile.picture,
      spesialis: item.profile && item.profile.spesialis,
      description: item.profile && item.profile.description,
      aboutUs: item.profile && item.profile.aboutUs,
      city: item.profile && item.profile.city,
      province: item.profile && item.profile.province,
      country: item.profile && item.profile.country,
      details: item.profile && item.profile.details,
      days: item.days,
      open: item.open,
      close: item.close,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();

    let url = "";
    let config = {};

    if (dataType === "Daftar Dokter Aktif") {
      url = `http://localhost:5000/api/v1/profiles/update-doctor/${updateUserData.id}`;
      config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
    } else if (dataType === "Daftar Praktek Dokter") {
      url = `http://localhost:5000/api/v1/practice/update/${updateUserData.id}`;
      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
    }

    try {
      let response;

      if (dataType === "Daftar Dokter Aktif") {
        const formData = new FormData();
        formData.append("username", updateUserData.username);
        formData.append("email", updateUserData.email);
        formData.append("name", updateUserData.name);
        formData.append("phone", updateUserData.phone);
        formData.append("picture", updateUserData.picture);
        formData.append("spesialis", updateUserData.spesialis);
        formData.append("description", updateUserData.description);
        formData.append("aboutUs", updateUserData.aboutUs);
        formData.append("city", updateUserData.city);
        formData.append("province", updateUserData.province);
        formData.append("country", updateUserData.country);
        formData.append("details", updateUserData.details);

        response = await axios.put(url, formData, config);
      } else if (dataType === "Daftar Praktek Dokter") {
        const body = {
          days: updateUserData.days,
          open: updateUserData.open,
          close: updateUserData.close,
        };

        response = await axios.put(url, body, config);
      }

      if (response.status === 200) {
        console.log("Data berhasil diubah");
        setAlert({
          show: true,
          variant: "success",
          message: "Data berhasil diubah.",
        });
        setShowUpdateModal(false);
        fetchData();
      } else {
        console.log("Gagal mengubah data");
        setAlert({
          show: true,
          variant: "danger",
          message: "Gagal mengubah data.",
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

  const renderFormUpdate = () => {
    if (dataType === "Daftar Dokter Aktif") {
      return (
        <>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className="fw-semibold">Username</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="username"
              value={updateUserData.username}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              name="email"
              value={updateUserData.email}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label className="fw-semibold">Nama Dokter</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="name"
              value={updateUserData.name}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label className="fw-semibold">No Telepon</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="phone"
              value={updateUserData.phone}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="picture">
            <Form.Label className="fw-semibold">Picture</Form.Label>
            <Form.Control
              size="lg"
              type="file"
              name="picture"
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="spesialis">
            <Form.Label className="fw-semibold">Dokter Spesialis</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="spesialis"
              value={updateUserData.spesialis}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label className="fw-semibold">Deskripsi</Form.Label>
            <Form.Control
              size="lg"
              as="textarea"
              rows={3}
              name="description"
              value={updateUserData.description}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="aboutUs">
            <Form.Label className="fw-semibold">Tentang Dokter</Form.Label>
            <Form.Control
              size="lg"
              as="textarea"
              rows={3}
              name="aboutUs"
              value={updateUserData.aboutUs}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label className="fw-semibold">Kota</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="city"
              value={updateUserData.city}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="province">
            <Form.Label className="fw-semibold">Provinsi</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="province"
              value={updateUserData.province}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label className="fw-semibold">Negara</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="country"
              value={updateUserData.country}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="details">
            <Form.Label className="fw-semibold">Detail Alamat</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="details"
              value={updateUserData.details}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
        </>
      );
    } else if (dataType === "Daftar Praktek Dokter") {
      return (
        <>
          <Form.Group className="mb-3" controlId="days">
            <Form.Label className="fw-semibold">Hari</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="days"
              value={updateUserData.days}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="open">
            <Form.Label className="fw-semibold">Jam Buka</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="open"
              value={updateUserData.open}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="close">
            <Form.Label className="fw-semibold">Jam Tutup</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="close"
              value={updateUserData.close}
              onChange={handleUpdateFormChange}
            />
          </Form.Group>
        </>
      );
    }
  };

  const handleDeleteClick = async (id) => {
    handleDeleteConfirmationShow(id);
  };

  const handleDeleteConfirmed = async () => {
    let deleteUrl = "";

    if (dataType === "Daftar Dokter Aktif") {
      deleteUrl = `http://localhost:5000/api/v1/profiles/delete/${deleteConfirmation.idToDelete}`;
    } else if (dataType === "Daftar Praktek Dokter") {
      deleteUrl = `http://localhost:5000/api/v1/practice/delete/${deleteConfirmation.idToDelete}`;
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(deleteUrl, config);

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
    <div className="col-10 offset-1 mt-4">
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Title className="fw-semibold text-center">
          Tambah {dataType}
        </Modal.Title>
        <Modal.Body>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-9">
                <Form onSubmit={handleFormSubmit}>
                  {renderFormFields()}
                  <Button className="save mb-4 fw-bold" type="submit">
                    Simpan
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Title className="fw-semibold text-center">
          Ubah {dataType}
        </Modal.Title>
        <Modal.Body>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-9">
                <Form onSubmit={handleUpdateFormSubmit}>
                  {renderFormUpdate()}
                  <Button className="save mb-4 fw-bold" type="submit">
                    Simpan
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* KONFIRMASI HAPUS DATA */}
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
            className="cencel fw-bold align-items-center"
            onClick={handleDeleteConfirmationClose}
          >
            Batal
          </Button>
          <Button
            className="hapus fw-bold align-items-center"
            onClick={handleDeleteConfirmed}
          >
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>

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

      <div className="d-flex mb-2">
        <NavDropdown
          className="mt-2 fs-5 fw-bold text-black col-4"
          title={dataType}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item onClick={() => setDataType("Daftar Dokter Aktif")}>
            Daftar Dokter Aktif
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => setDataType("Daftar Praktek Dokter")}
          >
            Daftar Praktek Dokter
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

export default UserActive;
