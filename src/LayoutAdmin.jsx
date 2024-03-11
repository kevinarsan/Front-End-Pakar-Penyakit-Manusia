import React from "react";
import NavbarAdminComponent from "./component/NavbarAdminComponent";

const LayoutAdmin = ({ children }) => {
  return (
    <div style={{ position: "relative" }}>
      <NavbarAdminComponent>{children}</NavbarAdminComponent>
    </div>
  );
};

export default LayoutAdmin;
