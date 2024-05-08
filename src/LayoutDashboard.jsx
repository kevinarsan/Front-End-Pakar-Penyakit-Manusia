import React from "react";
import NavbarComponentDashboard from "./component/NavbarComponentDashboard";
import FooterComponent from "./component/FooterComponent";

const LayoutDashboard = ({ children }) => {
  return (
    <div>
      <NavbarComponentDashboard /> {children} <FooterComponent />
    </div>
  );
};

export default LayoutDashboard;
