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

const AboutAdmin = () => {
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    variant: "success",
    message: "",
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    idToDelete: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  const handleClose = () => {
    setShow(false);
    setAlert({ show: false, variant: "success", message: "" });
  };
  const handleShow = () => setShow(true);

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmation({ show: false, idToDelete: null });
  };
  const handleDeleteConfirmationShow = (id) => {
    setDeleteConfirmation({ show: true, idToDelete: id });
  };

  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("Visi & Misi");

  const [formData, setFormData] = useState({
    name: "",
    bab: "",
    description: "",
    linkVideo: "",
    pertanyaan: "",
    jawaban: "",
    email: "",
    picture: null,
  });

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

      if (dataType === "Visi & Misi") {
        url = "http://localhost:5000/api/v1/about/visi-misi";
      } else if (dataType === "Teams") {
        url = "http://localhost:5000/api/v1/about/teams";
      } else if (dataType === "Moto") {
        url = "http://localhost:5000/api/v1/about/description-team";
      } else if (dataType === "Tutorials") {
        url = "http://localhost:5000/api/v1/about/tutorials";
      } else if (dataType === "FAQ") {
        url = "http://localhost:5000/api/v1/about/faq";
      } else if (dataType === "Kontak") {
        url = "http://localhost:5000/api/v1/about/contact";
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
        setData(
          response.data.existingVisi ||
            response.data.teams ||
            response.data.about ||
            response.data.videos ||
            response.data.FAQ ||
            response.data.contacts ||
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

  const handleUpdateClick = (item) => {
    setSelectedData(item);
    setFormData(item);
    handleShow();
  };

  const handleDeleteClick = async (id) => {
    handleDeleteConfirmationShow(id);
  };

  const handleDeleteConfirmed = async () => {
    let deleteUrl = "";

    if (dataType === "Visi & Misi") {
      deleteUrl = `http://localhost:5000/api/v1/about/visi-misi/${deleteConfirmation.idToDelete}`;
    } else if (dataType === "Teams") {
      deleteUrl = `http://localhost:5000/api/v1/about/teams/${deleteConfirmation.idToDelete}`;
    } else if (dataType === "Moto") {
      deleteUrl = `http://localhost:5000/api/v1/about/moto-team/${deleteConfirmation.idToDelete}`;
    } else if (dataType === "Tutorials") {
      deleteUrl = `http://localhost:5000/api/v1/about/tutorials/${deleteConfirmation.idToDelete}`;
    } else if (dataType === "FAQ") {
      deleteUrl = `http://localhost:5000/api/v1/about/faq/${deleteConfirmation.idToDelete}`;
    } else if (dataType === "Kontak") {
      deleteUrl = `http://localhost:5000/api/v1/about/contact/${deleteConfirmation.idToDelete}`;
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

  const handleTambahClick = (dataType) => {
    setSelectedData(null);
    setFormData({
      name: "",
      bab: "",
      description: "",
      linkVideo: "",
      pertanyaan: "",
      jawaban: "",
      email: "",
      picture: null,
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

    if (selectedData) {
      if (dataType === "Visi & Misi") {
        url = `http://localhost:5000/api/v1/about/visi-misi/${selectedData.id}`;
        config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      } else if (dataType === "Teams") {
        url = `http://localhost:5000/api/v1/about/teams/${selectedData.id}`;
        config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      } else if (dataType === "Moto") {
        url = `http://localhost:5000/api/v1/about/moto-team/${selectedData.id}`;
        config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      } else if (dataType === "Tutorials") {
        url = `http://localhost:5000/api/v1/about/tutorials/${selectedData.id}`;
        config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      } else if (dataType === "FAQ") {
        url = `http://localhost:5000/api/v1/about/faq/${selectedData.id}`;
        config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      } else if (dataType === "Kontak") {
        url = `http://localhost:5000/api/v1/about/contact/${selectedData.id}`;
        config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      }
    } else {
      if (dataType === "Visi & Misi") {
        url = "http://localhost:5000/api/v1/about/visi-misi";
        config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      } else if (dataType === "Teams") {
        url = "http://localhost:5000/api/v1/about/teams";
        config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      } else if (dataType === "Moto") {
        url = "http://localhost:5000/api/v1/about/description-team";
        config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      } else if (dataType === "Tutorials") {
        url = "http://localhost:5000/api/v1/about/tutorials";
        config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      } else if (dataType === "FAQ") {
        url = "http://localhost:5000/api/v1/about/faq";
        config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      } else if (dataType === "Kontak") {
        url = "http://localhost:5000/api/v1/about/contact";
        config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      }
    }

    const token = localStorage.getItem("token");

    if (token) {
      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    }

    try {
      let response;

      if (
        dataType === "Visi & Misi" ||
        dataType === "Moto" ||
        dataType === "FAQ" ||
        dataType === "Tutorials" ||
        dataType === "Teams" ||
        dataType === "Kontak"
      ) {
        response = selectedData
          ? await axios.put(url, formData, config)
          : await axios.post(url, formData, config);
      } else if (dataType === "Teams") {
        const formDataToSend = new FormData();

        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }

        response = selectedData
          ? await axios.put(url, formDataToSend, config)
          : await axios.post(url, formDataToSend, config);
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

  const renderFormFields = () => {
    if (dataType === "Visi & Misi") {
      return (
        <>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bab">
            <Form.Label>Tujuan</Form.Label>
            <Form.Control
              type="text"
              name="bab"
              value={formData.bab}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
        </>
      );
    } else if (dataType === "Teams") {
      return (
        <>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="picture">
            <Form.Label>Foto</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="picture"
              onChange={handleFormChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
        </>
      );
    } else if (dataType === "Moto") {
      return (
        <>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="area"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
        </>
      );
    } else if (dataType === "Tutorials") {
      return (
        <>
          <Form.Group className="mb-3" controlId="linkVideo">
            <Form.Label>Link Video</Form.Label>
            <Form.Control
              type="text"
              name="linkVideo"
              value={formData.linkVideo}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
        </>
      );
    } else if (dataType === "FAQ") {
      return (
        <>
          <Form.Group className="mb-3" controlId="pertanyaan">
            <Form.Label>Pertanyaan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="pertanyaan"
              value={formData.pertanyaan}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="jawaban">
            <Form.Label>Jawaban</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="jawaban"
              value={formData.jawaban}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
        </>
      );
    } else if (dataType === "Kontak") {
      return (
        <>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Kontak</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
        </>
      );
    }
  };

  const renderTable = () => {
    if (!data || data.length === 0) {
      return <p>Data tidak ditemukan</p>;
    }

    const currentData = data.slice(startIndex, endIndex);

    return (
      <div>
        {" "}
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
                    <th className="col-2">Name</th>
                    <th className="col-8">Description</th>
                  </>
                ) : dataType === "Tutorials" ? (
                  <>
                    <th className="col-4">Link Video</th>
                    <th className="col-6">Deskripsi</th>
                  </>
                ) : dataType === "FAQ" ? (
                  <>
                    <th className="col-4">Pertanyaan</th>
                    <th className="col-6">Jawaban</th>
                  </>
                ) : dataType === "Kontak" ? (
                  <>
                    <th className="col-5">Kontak</th>
                    <th className="col-5">Email</th>
                  </>
                ) : null}
                <th className="col-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {dataType === "Visi & Misi" ? (
                    <>
                      <td>{item.name}</td>
                      <td>{item.bab}</td>
                      <td>{item.description}</td>
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
                  ) : dataType === "Moto" ? (
                    <>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
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
                  ) : dataType === "Tutorials" ? (
                    <>
                      <td>{item.linkVideo}</td>
                      <td>{item.description}</td>
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
                  ) : dataType === "FAQ" ? (
                    <>
                      <td>{item.pertanyaan}</td>
                      <td>{item.jawaban}</td>
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
                  ) : dataType === "Kontak" ? (
                    <>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
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
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Sebelumnya
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
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Selanjutnya
          </Button>
        </div>
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
    } else if (dataType === "Tutorials") {
      text = "Tambah Tutorials";
    } else if (dataType === "FAQ") {
      text = "Tambah FAQ";
    } else if (dataType === "Kontak") {
      text = "Tambah Kontak";
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

  return (
    <div className="col-10 offset-1 mt-4">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold">
            Tambah Data {dataType}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            {renderFormFields()}
            <Button className="save" type="submit">
              Simpan
            </Button>
          </Form>
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
          <Button className="cencel" onClick={handleDeleteConfirmationClose}>
            Batal
          </Button>
          <Button className="hapus" onClick={handleDeleteConfirmed}>
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
          <NavDropdown.Item onClick={() => setDataType("Visi & Misi")}>
            Visi & Misi
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setDataType("Teams")}>
            Teams
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setDataType("Moto")}>
            Moto
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setDataType("Tutorials")}>
            Tutorials
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setDataType("FAQ")}>
            FAQ
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setDataType("Kontak")}>
            Kontak
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
