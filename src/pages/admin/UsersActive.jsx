import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";

const UserActive = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <div>
      <div className="col-10 offset-1 mt-4">
        <div className="d-flex mb-2">
          <h5 className="mt-2 fw-bold text-black col-4">User Aktif</h5>
          <div className="col-8 text-end">
            <Button className="tambah me-2 fw-semibold">
              <FaPlus className="me-2" />
              Tambah Hospitals
            </Button>
            <Button className="filter me-2 ms-2 fw-semibold">
              <FaFilter className="me-2" />
              Filter
            </Button>
            <FaSearch className="logo-search fs-3 ms-2" />
          </div>
        </div>
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
                <th className="col-2">City</th>
                <th className="col-1">Province</th>
                <th className="col-1">Country</th>
              </tr>
            </thead>

            <tbody>
              {users.map((item) => (
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
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserActive;
