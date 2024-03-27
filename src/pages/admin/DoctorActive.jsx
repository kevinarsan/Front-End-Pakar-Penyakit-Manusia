import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const UserActive = () => {
  const [dokter, setDokter] = useState([]);
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
        "http://localhost:5000/api/v1/profiles/get",
        config
      );

      if (response.data.success === "Profile retrieved succesfully") {
        const dokterData = response.data.userGet.filter(
          (item) => item.role === "dokter"
        );

        setDokter(dokterData);
      } else {
        console.error("Failed to fetch user data:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const tableStyle = {
    overflowX: "auto",
  };

  const renderTable = () => {
    const totalPages = Math.ceil(dokter.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = dokter.slice(indexOfFirstItem, indexOfLastItem);

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
        <div className="table-dokter overflow-auto" style={tableStyle}>
          <Table className="tabel-dkt">
            <thead>
              <tr>
                <th>Username</th>
                <th style={{ minWidth: "11rem" }}>Email</th>
                <th style={{ minWidth: "6rem" }}>Nama Dokter</th>
                <th>Phone</th>
                <th>Picture</th>
                <th>Spesialis</th>
                <th style={{ minWidth: "10rem" }}>Deskripsi</th>
                <th style={{ minWidth: "13rem" }}>Tentang Dokter</th>
                <th style={{ minWidth: "7.8rem" }}>Alamat</th>
                <th style={{ minWidth: "7rem" }}>Rumah Sakit</th>
                <th style={{ minWidth: "8rem" }}>Jadwal Praktek</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.profile.name}</td>
                  <td>{item.profile.phone}</td>
                  <td>
                    <img
                      src={item.profile.picture}
                      alt={item.profile.name}
                      style={{ height: "50px", width: "50px" }}
                    />
                  </td>
                  <td>{item.profile.spesialis}</td>
                  <td>{item.profile.description}</td>
                  <td>{item.profile.aboutUs}</td>
                  <td>
                    {item.profile.city}, {item.profile.province},{" "}
                    {item.profile.country}, {item.profile.details}
                  </td>
                  <td>RS. Umum Daerah Wates</td>
                  <td>
                    <p>Senin : 18:00-19:00</p>
                    <p>Selasa : 18:00-19:00</p>
                    <p>Rabu : 18:00-19:00</p>
                    <p>Kamis : 18:00-19:00</p>
                    <p>Jum'at : 18:00-19:00</p>
                    <p>Sabtu : 18:00-19:00</p>
                    <p>Minggu : Libur</p>
                  </td>
                  <td>
                    <div className="d-flex">
                      <Button
                        className="update d-flex justify-content-center align-items-center me-1"
                        // onClick={() => handleShowUpdateModal(item.id)}
                      >
                        Ubah
                      </Button>
                      <Button
                        className="delete d-flex justify-content-center align-items-center"
                        // onClick={() => handleDeleteUser(item.id)}
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

  return (
    <div>
      <div className="col-10 offset-1 mt-4">
        <div className="d-flex mb-1">
          <h5 className="mt-2 fw-bold text-black col-4">Dokter Aktif</h5>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <Button
              className="tambah me-2 fw-semibold d-flex align-items-center"
              // onClick={handleTambahClick}
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
