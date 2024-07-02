import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const UserActive = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
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
  const [updateUserData, setUpdateUserData] = useState({
    id: null,
    username: "",
    email: "",
    name: "",
    phone: "",
    picture: null,
    city: "",
    province: "",
    country: "",
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
        "https://api-penyakit-manusia.up.railway.app/api/v1/profiles/get",
        config
      );

      if (response.data.success === "Profile retrieved succesfully") {
        const userData = response.data.userGet.filter(
          (item) => item.role === "user"
        );

        setUsers(userData);
      } else {
        console.error("Failed to fetch user data:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderTable = () => {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = users.slice(indexOfFirstItem, indexOfLastItem);

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
                <th className="col-1">Username</th>
                <th className="col-2">Email</th>
                <th className="col-1">Role</th>
                <th className="col-2">Name</th>
                <th className="col-1">Phone</th>
                <th className="col-1">Picture</th>
                <th className="col-1">City</th>
                <th className="col-1">Province</th>
                <th className="col-1">Country</th>
                <th className="col-1">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.profile.name}</td>
                  <td>{item.profile.phone}</td>
                  <td>
                    <img
                      src={item.profile.picture}
                      alt={item.profile.name}
                      style={{ height: "50px", width: "50px" }}
                    />
                  </td>
                  <td>{item.profile.city}</td>
                  <td>{item.profile.province}</td>
                  <td>{item.profile.country}</td>
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
        "https://api-penyakit-manusia.up.railway.app/api/v1/auth/register-users",
        {
          username,
          email,
          password,
          phone,
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
        if (error.response.status === 400) {
          setAlert({
            show: true,
            variant: "danger",
            message: "Email sudah tersedia.",
          });
        } else if (error.response.status === 401) {
          setAlert({
            show: true,
            variant: "danger",
            message: "Username sudah tersedia.",
          });
        } else if (error.response.status === 402) {
          setAlert({
            show: true,
            variant: "danger",
            message: "No telepon sudah tersedia.",
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
    const userToUpdate = users.find((user) => user.id === id);
    if (userToUpdate) {
      setUpdateUserData({
        id: userToUpdate.id,
        username: userToUpdate.username,
        email: userToUpdate.email,
        name: userToUpdate.profile.name,
        phone: userToUpdate.profile.phone,
        picture: null,
        city: userToUpdate.profile.city,
        province: userToUpdate.profile.province,
        country: userToUpdate.profile.country,
      });
      setShowUpdateModal(true);
    }
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handlePictureChange = (e) => {
    setUpdateUserData((prevUserData) => ({
      ...prevUserData,
      picture: e.target.files[0],
    }));
  };

  const handleFormUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("username", updateUserData.username);
      formData.append("email", updateUserData.email);
      formData.append("name", updateUserData.name);
      formData.append("phone", updateUserData.phone);
      if (updateUserData.picture) {
        formData.append("picture", updateUserData.picture);
      }
      formData.append("city", updateUserData.city);
      formData.append("province", updateUserData.province);
      formData.append("country", updateUserData.country);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `https://api-penyakit-manusia.up.railway.app/api/v1/profiles/update-users/${updateUserData.id}`,
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
        if (error.response.status === 400) {
          setAlert({
            show: true,
            variant: "danger",
            message: "Email sudah tersedia.",
          });
        } else if (error.response.status === 401) {
          setAlert({
            show: true,
            variant: "danger",
            message: "Username sudah tersedia.",
          });
        } else if (error.response.status === 402) {
          setAlert({
            show: true,
            variant: "danger",
            message: "No telepon sudah tersedia.",
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
        `https://api-penyakit-manusia.up.railway.app/api/v1/profiles/delete/${deleteConfirmation.idToDelete}`,
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
          Tambah Data Users
        </Modal.Title>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-9">
              <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3" control="username">
                    <Form.Label className="fw-semibold">Username</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username..."
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" control="email">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      size="lg"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone..."
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
          Update Data Users
        </Modal.Title>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-9">
              <Modal.Body>
                <Form onSubmit={handleFormUpdate}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label className="fw-semibold">Username</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="username"
                      value={updateUserData.username}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      size="lg"
                      type="email"
                      name="email"
                      value={updateUserData.email}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label className="fw-semibold">Nama</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="name"
                      value={updateUserData.name}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label className="fw-semibold">No Telepon</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="phone"
                      value={updateUserData.phone}
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
                      onChange={handlePictureChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="city">
                    <Form.Label className="fw-semibold">Kota</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="city"
                      value={updateUserData.city}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="province">
                    <Form.Label className="fw-semibold">Provinsi</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="province"
                      value={updateUserData.province}
                      onChange={handleUpdateInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="country">
                    <Form.Label className="fw-semibold">Negara</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="country"
                      value={updateUserData.country}
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
          <h5 className="mt-2 fw-bold text-black col-4">User Aktif</h5>
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

export default UserActive;
