import React from "react";
import NavbarComponent from "./component/NavbarComponent";
import FooterComponent from "./component/FooterComponent";

const Layout = ({ children }) => {
  return (
    <div>
      <NavbarComponent /> {children} <FooterComponent />
    </div>
  );
};

export default Layout;
