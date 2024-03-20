import React from "react";
import NavbarAdminComponent from "./component/NavbarAdminComponent";
import { Navigate } from "react-router-dom";

const LayoutAdmin = ({ children }) => {
  const role = localStorage.getItem("role");

  if (!role || role !== "admin") {
    return <Navigate to="/admin/login-admin" />;
  }

  return (
    <div style={{ position: "relative" }}>
      <NavbarAdminComponent>{children}</NavbarAdminComponent>
    </div>
  );
};

export default LayoutAdmin;
